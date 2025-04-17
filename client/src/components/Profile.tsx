import { Home, Mail, Phone, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";

const Profile = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        contact: '',
        profileImg: '',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setProfileData((prev) => ({
                ...prev,
                profileImg: url,
            }));
        }
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(profileData);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <form onSubmit={submitHandler} className="flex flex-col gap-6">
                {/* Avatar + Name */}
                <div className="flex items-center gap-6">
                    <div
                        onClick={handleFileClick}
                        className="relative w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer group"
                    >
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="absolute inset-0 bg-black/40 rounded-full hidden group-hover:flex justify-center items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <Plus className="text-white w-6 h-6" />
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={inputChangeHandler}
                        placeholder="Full Name"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Email Field */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-100">
                    <Mail className="text-gray-500" />
                    <div className="flex-1">
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={profileData.email}
                            onChange={inputChangeHandler}
                            placeholder="your.email@example.com"
                            className="w-full mt-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 text-gray-800"
                        />
                    </div>
                </div>

                {/* Contact Field */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-100">
                    <Phone className="text-gray-500" />
                    <div className="flex-1">
                        <label className="text-sm text-gray-600">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={profileData.contact}
                            onChange={inputChangeHandler}
                            placeholder="+123456789"
                            className="w-full mt-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 text-gray-800"
                        />
                    </div>
                </div>

                {/* Address Field */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-100">
                    <Home className="text-gray-500" />
                    <div className="flex-1">
                        <label className="text-sm text-gray-600">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="123 Street, City"
                            className="w-full mt-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 text-gray-800"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button
                        type="submit"
                        className="bg-button"
                    >
                        Update Profile
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
