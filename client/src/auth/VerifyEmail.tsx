import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useUserStore } from "@/stote/useUserStore";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyEmail = () => {
    const { verifyEmail, loading } = useUserStore()
    const navigate = useNavigate()
    const [otp, setOtp] = useState<string>("")
    const handleVerify = async () => {
        if (otp.length != 6) {
            return toast.error("OTP must be 6 character long.")
        }
        await verifyEmail(otp)
        navigate("/")
    }
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className="p-5 w-full max-w-md text-center border-2 drop-shadow-lg rounded-xl space-y-6">
                <h2 className="text-2xl font-semibold">Verify Your Email</h2>
                <p className="text-base text-gray-700">
                    Enter the 6-digit code sent to your email address
                </p>

                <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                        <div className="flex gap-2">
                            <InputOTPGroup className="flex gap-2">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>

                            <InputOTPSeparator />

                            <InputOTPGroup className="flex gap-2">
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </div>
                    </InputOTP>
                </div>
                {
                    loading ? <Button disabled className="bg-button w-full"><Loader2 className="animate-spin" />please wait</Button> : <Button onClick={() => handleVerify()} className="bg-button w-full">Verify</Button>

                }

            </div>
        </div>
    );
};

export default VerifyEmail;
