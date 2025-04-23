import AddMenu from "@/admin/AddMenu";
import AddRestaurant from "@/admin/AddRestaurant";
import Orders from "@/admin/Orders";
import ForgetPass from "@/auth/ForgetPass";
import Login from "@/auth/Login";
import Register from "@/auth/Register";
import ResetPassword from "@/auth/ResetPassword";
import VerifyEmail from "@/auth/VerifyEmail";
import Cart from "@/components/Cart";
import HeroSection from "@/components/HeroSection";
import Order from "@/components/Order";
import Profile from "@/components/Profile";
import RestaurantDetail from "@/components/RestaurantDetails";
import SearchPage from "@/components/SearchPage";
import MainLayout from "@/Layout/MainLayout";
import AdminProtectRoute from "@/protect-route/AdminProtectRoute";
import AuthenticateProtectRoute from "@/protect-route/AuthenticateProtectRoute";
import UserProtectRoute from "@/protect-route/UserProtectRoute";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <UserProtectRoute><MainLayout></MainLayout></UserProtectRoute>,
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
                path: "/restaurant/search/:text",
                element: <SearchPage></SearchPage>
            },
            {
                path: '/cart',
                element: <Cart></Cart>
            },
            {
                path: "/details/:restaurantId",
                element: <RestaurantDetail></RestaurantDetail>
            },
            {
                path: "/admin/restaurant",
                element: <AdminProtectRoute><AddRestaurant></AddRestaurant></AdminProtectRoute>
            }, {
                path: "/admin/addMenu",
                element: <AdminProtectRoute><AddMenu></AddMenu></AdminProtectRoute>
            },
            {
                path: "/admin/orders",
                element: <AdminProtectRoute><Orders></Orders></AdminProtectRoute>
            },
            {
                path: "/order",
                element: <Order></Order>
            }
        ]
    },

    {
        path: "/signin",
        element: <AuthenticateProtectRoute> <Login></Login></AuthenticateProtectRoute>,
    },
    {
        path: "/signup",
        element: <AuthenticateProtectRoute><Register></Register></AuthenticateProtectRoute>
    },
    {
        path: "/forgetPass",
        element: <AuthenticateProtectRoute><ForgetPass></ForgetPass></AuthenticateProtectRoute>
    },
    {
        path: "/verifyEmail",
        element: <VerifyEmail></VerifyEmail>
    },
    {
        path: "/resetPassword/:token",
        element: <ResetPassword></ResetPassword>
    }

]);
