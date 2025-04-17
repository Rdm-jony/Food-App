import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import heroPizza from '../assets/hero_pizza.png'

const HeroSection = () => {
    const [search, setSearch] = useState<string>("")
    return (
        <div className="flex items-center justify-center gap-10">
            <div className="w-[35%]">
                <h2 className="text-5xl font-bold">Order Food Anytime & Anywhere</h2>
                <p className="font-medium text-gray-600 my-5">Hey! our delicious food is waiting for you. We are always near to you</p>
                <div className="flex">
                    <div className="relative w-full">
                        <Input className="pl-10 rounded-r-none" name="search" value={search} onChange={(e) => setSearch(e.target.value)} type="email" placeholder="Search" />
                        <Search className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500 " size={20} />
                    </div>
                    <Button className="bg-button rounded-l-none">Search</Button>
                </div>
            </div>
            <div className="w-[40%]">
                <img className="object-cover w-full max-h-[500px]" src={heroPizza} alt="" />
            </div>
        </div>
    );
};

export default HeroSection;