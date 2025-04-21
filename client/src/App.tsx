import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { Toaster } from "sonner";
import { useEffect } from "react";
import LoadingPage from "./components/LoadingPage";
import { useUserStore } from "./stote/useUserStore";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

const App = () => {
    const { checkingTokenAuth, isCheckingAuth } = useUserStore()
    useEffect(() => {
        checkingTokenAuth()
    }, [checkingTokenAuth])
    console.log(isCheckingAuth)
    if (isCheckingAuth) return <LoadingPage></LoadingPage>
    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <Toaster />
            </QueryClientProvider>

        </main>
    );
};

export default App;