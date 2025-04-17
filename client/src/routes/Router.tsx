import ForgetPass from "@/auth/ForgetPass";
import Login from "@/auth/Login";
import Register from "@/auth/Register";
import VerifyEmail from "@/auth/VerifyEmail";
import HeroSection from "@/components/HeroSection";
import Profile from "@/components/Profile";
import SearchPage from "@/components/SearchPage";
import MainLayout from "@/Layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <HeroSection></HeroSection>
            },
            {
                path: "/profile",
                element: <Profile></Profile>
            },
            {
                path: "/search",
                element: <SearchPage></SearchPage>
            }
        ]
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
