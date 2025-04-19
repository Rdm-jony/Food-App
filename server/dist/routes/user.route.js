"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import express
const user_controller_1 = require("../controller/user.controller"); // Import your handler function
const router = express_1.default.Router(); // Create a new router instance
// Correctly assign the POST route handler
router.post("/signUp", user_controller_1.signUp); // Use the signUp handler function for this route
exports.default = router; // Export the router
