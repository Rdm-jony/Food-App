import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RegisterInputState, userSchemaRegister } from "@/schema/UserSchema";
import { Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
    const [input, setInput] = useState<RegisterInputState>({
        password: '',
        email: "",
        fullName: '',
        contact: ''
    })
    const [error, setError] = useState<Partial<RegisterInputState>>({})

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
        console.log(value)
    }
    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        const result = userSchemaRegister.safeParse(input)
        if (!result.success) {
            const errors = result.error.formErrors.fieldErrors
            setError(errors as Partial<RegisterInputState>)
            return;
        }
        console.log(input)

    }
    const loading = false;
    return (
        <div className="w-1/3 h-screen mx-auto flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold my-5">Food App</h2>

            <form onSubmit={submitHandler} className="w-full flex flex-col gap-2">
                <div className="relative">
                    <Input className="pl-10" name="fullName" value={input.fullName} onChange={changeEventHandler} type="text" placeholder="Full Name" />
                    <User className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500 " size={20} />
                </div>
                {
                    error && <span className="text-red-600 text-xs">{error.fullName}</span>
                }
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
                <div className="relative">
                    <Input className="pl-10" type="number" name="contact" value={input.contact} onChange={changeEventHandler} placeholder="Contact Number" />
                    <Phone className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500 " size={20} />
                </div>
                {
                    error && <span className="text-red-600 text-xs">{error.contact}</span>
                }
                {
                    loading ? <Button disabled className="bg-button w-full"><Loader2 className="animate-spin" />please wait</Button> : <Button className="bg-button w-full" type="submit">Register</Button>

                }

            </form>
            <Separator className="w-full my-5" />
            <p className="text-sm">Already have an account? <Link to="/signin" className="text-blue-600">Sign In</Link></p>
        </div>
    );
};

export default Register;