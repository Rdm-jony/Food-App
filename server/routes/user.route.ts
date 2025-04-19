import express from 'express'; 
import { login, signUp } from '../controller/user.controller'; 

const router = express.Router();  

// Correctly assign the POST route handler
router.post("/signUp", signUp);  
router.post("/login", login);  

export default router;  
