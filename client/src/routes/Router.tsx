import Login from "@/auth/Login";
import Register from "@/auth/Register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/signin",
        element: <Login></Login>,
    },
    {
        path: "/signup",
        element: <Register></Register>
    }
]);
