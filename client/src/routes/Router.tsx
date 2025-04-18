import AddRestaurant from "@/admin/AddRestaurant";
import ForgetPass from "@/auth/ForgetPass";
import Login from "@/auth/Login";
import Register from "@/auth/Register";
import VerifyEmail from "@/auth/VerifyEmail";
import Cart from "@/components/Cart";
import HeroSection from "@/components/HeroSection";
import Profile from "@/components/Profile";
import RestaurantDetail from "@/components/RestaurantDetails";
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
            },
            {
                path: '/cart',
                element: <Cart></Cart>
            },
            {
                path: "/details",
                element: <RestaurantDetail></RestaurantDetail>
            },
            {
                path: "/admin/restaurant",
                element: <AddRestaurant></AddRestaurant>
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
    },

]);
