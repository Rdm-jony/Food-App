import ForgetPass from "@/auth/ForgetPass";
import Login from "@/auth/Login";
import Register from "@/auth/Register";
import VerifyEmail from "@/auth/VerifyEmail";
import Navbar from "@/components/Navbar";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar></Navbar>
    },

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
