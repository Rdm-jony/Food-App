import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPass = () => {
    const [email, setEmail] = useState<string>("")
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className="p-5 w-1/3 text-center border-2 drop-shadow-lg rounded-xl space-y-3">
                <h2 className="text-2xl font-semibold">Forget Password</h2>
                <p className="text-base text-gray-700">Enter your email address to reset your password</p>
                <div className="relative">
                    <Input className="pl-10" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                    <Mail className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500 " size={20} />

                </div>
                <Button className="bg-button w-full">Send Reset Link</Button>
                <p className="text-sm">Back to <Link className="text-blue-600" to="/signin">Log In</Link></p>

            </div>
        </div>
    );
};

export default ForgetPass;