import express from 'express';
import { checkAuth, forgetPassword, login, logout, resetPassword, signUp, updateProfile, verifyEmail } from '../controller/user.controller';
import { isAuthenticate } from '../middlewares/isAuthenticate';
import multer from 'multer';

const router = express.Router();

// Correctly assign the POST route handler
router.get("/check-auth", isAuthenticate, checkAuth);
router.post("/signUp", signUp);
router.post("/login", login);
router.post("/verifyEmail", verifyEmail);
router.post("/logout", logout);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword/:token", resetPassword);
router.post("/updateProfile", isAuthenticate, multer().single("profilePicture"), updateProfile);

export default router;  
