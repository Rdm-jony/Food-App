import { Home, Mail, Phone, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useUserStore } from "@/stote/useUserStore";
const Profile = () => {
    const { user, updateProfile } = useUserStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<File | null>(null);
    const [profileData, setProfileData] = useState({
        fullName: user?.fullName || '',
        address: user?.address || '',
        city: user?.city || '',
        country: user?.country || '',
        email: user?.email || '',
        contact: user?.contact || 0,
        profileImg: user?.profileImg  || undefined,
    });
    console.log(user)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageUrl(file);
        }
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();

    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: name === 'contact' ? Number(value) : value,
        }));
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", profileData.fullName);
        formData.append("email", profileData.email);
        formData.append("contact", profileData.contact.toString());
        formData.append("address", profileData.address);
        formData.append("city", profileData.city);
        formData.append("country", profileData.country);
        if (imageUrl) {
            formData.append("profilePicture", imageUrl);
        }
        await updateProfile(formData);
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
                            <AvatarImage src={profileData.profileImg} />
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
                            readOnly
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
