import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { Toaster } from "sonner";
import { useEffect } from "react";
import LoadingPage from "./components/LoadingPage";
import { useUserStore } from "./stote/useUserStore";

const App = () => {
    const { checkingTokenAuth, isCheckingAuth } = useUserStore()
    useEffect(() => {
        checkingTokenAuth()
    }, [checkingTokenAuth])
    console.log(isCheckingAuth)
    if (isCheckingAuth) return <LoadingPage></LoadingPage>
    return (
        <main>
            <RouterProvider router={router} />
            <Toaster />
        </main>
    );
};

export default App;