"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDb_1 = require("./db/connectDb");
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route")); // Import the router
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
dotenv_1.default.config();
(0, connectDb_1.connectDb)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Use the user route under the "/user" base path
app.use("/user", user_route_1.default); // This correctly attaches the routes defined in the user.route.ts
app.listen(port, () => {
    console.log(`Food app server running at ${port}`);
});
