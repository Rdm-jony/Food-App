import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userSchemaLogin } from "@/schema/UserSchema";
import { useUserStore } from "@/stote/useUserStore";
import { Loader2, Lock, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const { login, loading } = useUserStore()
    const navigate = useNavigate()
    const [input, setInput] = useState<LoginInputState>({
        password: '',
        email: ""
    })
    const [error, setError] = useState<Partial<LoginInputState>>({})

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
        console.log(value)
    }
    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        const result = userSchemaLogin.safeParse(input)
        if (!result.success) {
            const errors = result.error.formErrors.fieldErrors
            setError(errors as Partial<LoginInputState>)
            return;
        }
        try {
            await login(input)
            navigate("/")
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="w-1/3 h-screen mx-auto flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold my-5">Food App</h2>

            <form onSubmit={submitHandler} className="w-full flex flex-col gap-2">
                <div className="relative">
                    <Input className="pl-10" name="email" value={input.email} onChange={changeEventHandler} type="email" placeholder="Email" />
                    <Mail className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500 " size={20} />

                </div>
                {
                    error && <span className="text-red-600 text-xs">{error.email}</span>
                }

                <div className="relative">
                    <Input className="pl-10" type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Password" />
                    <Lock className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500 " size={20} />
                </div>
                {
                    error && <span className="text-red-600 text-xs">{error.password}</span>
                }
                {
                    loading ? <Button disabled className="bg-button w-full"><Loader2 className="animate-spin" />please wait</Button> : <Button className="bg-button w-full" type="submit">Login</Button>

                }

            </form>
            <Link className="text-xs text-blue-600 mt-2" to='/forgetPass'>forget password?</Link>
            <Separator className="w-full my-5" />
            <p className="text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link></p>
        </div>
    );
};

export default Login;