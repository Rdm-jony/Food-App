import express from 'express';
import { checkAuth, forgetPassword, login, logout, resetPassword, signUp, verifyEmail } from '../controller/user.controller';
import { isAuthenticate } from '../middlewares/isAuthenticate';

const router = express.Router();

// Correctly assign the POST route handler
router.get("/check-auth", isAuthenticate, checkAuth);
router.post("/signUp", signUp);
router.post("/login", login);
router.post("/verifyEmail", verifyEmail);
router.post("/logout", logout);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword/:token", resetPassword);

export default router;  
