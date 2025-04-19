import { Request, Response, RequestHandler } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendMailVerification } from "../mailtrap/mailtrap";

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
