import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stote/useUserStore";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
    const { token } = useParams()
    const { resetPassword } = useUserStore()
    const [newPassword, setNewPassword] = useState<string>("");
    const loading = false;
    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newPassword.length < 6) {
            return toast.error("Passwod must be at least 6 character long.")
        }

        if (token) {
            await resetPassword(token!, newPassword)
        }

    }
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <form onSubmit={handleResetPassword} className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
                    <p className="text-sm text-gray-600">Enter your new password to reset old one</p>
                </div>
                <div className="relative w-full">
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        className="pl-10"
                    />
                    <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
                </div>
                {
                    loading ? (
                        <Button disabled className="bg-button hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>
                    ) : (
                        <Button className="bg-button hover:bg-hoverOrange">Reset Password</Button>
                    )
                }
                <span className="text-center">
                    Back to{" "}
                    <Link to="/signIn" className="text-blue-500">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default ResetPassword;