"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateVerificationCode_1 = require("../utils/generateVerificationCode");
const signUp = async (req, res) => {
    try {
        const { fullName, email, password, contact } = req.body;
        let user = await user_model_1.User.findOne({ email }).select("-password");
        if (user) {
            return res.status(400).json({ success: false, message: "User already exist." });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const verificationCode = (0, generateVerificationCode_1.generateVerificationCode)();
        user = await user_model_1.User.create({
            fullName,
            email,
            password: hashedPassword,
            verificationToken: verificationCode,
            contact
        });
        return res.status(201).json({ success: true, message: "user create successfully." });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.signUp = signUp;
