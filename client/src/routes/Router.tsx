import ForgetPass from "@/auth/ForgetPass";
import Login from "@/auth/Login";
import Register from "@/auth/Register";
import VerifyEmail from "@/auth/VerifyEmail";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/signin",
        element: <Login></Login>,
    },
    {
        path: "/signup",
        element: <Register></Register>
    },
    {
        path: "/forgetPass",
        element: <ForgetPass></ForgetPass>
    },
    {
        path: "/verifyEmail",
        element: <VerifyEmail></VerifyEmail>
    }
]);
