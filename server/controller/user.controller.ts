import { Request, Response, RequestHandler } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendMailVerification, sendResetPassSuccessEmail, sendResetPasswordEmail, sendWelcomeMail } from "../mailtrap/mailtrap";
import crypto from "crypto"

export const signUp: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, password, contact } = req.body;

        let user = await User.findOne({ email }).select("-password");

        if (user) {
            res.status(400).json({ success: false, message: "User already exists." });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a verification code
        const verificationCode = generateVerificationCode();

        // Create a new user
        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            verificationToken: verificationCode,
            contact,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,

        });
        generateToken(res, user)
        await sendMailVerification(email, verificationCode)
        const userWithOutPassword = await User.findOne({ email }).select("-password")
        res.status(201).json({ success: true, message: "User created successfully.", user: userWithOutPassword });

    } catch (error) {
        // Log the error and return a generic server error response
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ sucess: false, message: "Incorrect email or password" })
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ sucess: false, message: "Incorrect email or password" })
            return;
        }
        generateToken(res, user)
        user.lastLogin = new Date()
        await user.save()
        const userWithoutPassword = await User.findOne({ email }).select("-password");
        res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullName}`,
            user: userWithoutPassword
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const verifyEmail: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { verificationCode } = req.body;
        console.log(verificationCode)
        const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } }).select("-password")
        if (!user) {
            res.status(400).json({ success: false, message: "Invalid or expired verification token" })
            return;
        }
        user.isVerified = true
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save()
        await sendWelcomeMail(user.email, user.fullName)
        res.status(200).json({ success: true, message: "Email verified successfully", user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }

}

export const logout: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("token").status(200).json({ success: true, message: "Logged out successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const forgetPassword: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email }).select("-password")
        if (!user) {
            res.status(400).json({ success: false, message: "User doesn't exist" })
            return;
        }
        const resetPassToken = crypto.randomBytes(40).toString('hex');
        user.resetPasswordToken = resetPassToken
        user.resetPasswordTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000)
        await user.save()

        await sendResetPasswordEmail(email, `${process.env.BASE_URL}/resetPassword/${resetPassToken}`)
        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }

}

export const resetPassword: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiresAt: { $gt: Date.now() } })
        if (!user) {
            res.status(400).json({ success: false, message: "Invalid or expired reset token" })
            return;
        }
        user.password = await bcrypt.hash(newPassword, 10)
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined
        await user.save()
        await sendResetPassSuccessEmail(user.email)
        res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })

    }
}


