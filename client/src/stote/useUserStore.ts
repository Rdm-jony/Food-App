import { LoginInputState, RegisterInputState } from '@/schema/UserSchema'
import { toast } from 'sonner'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import axios from "axios"

const API_END_POINT = "http://localhost:5000/user"
axios.defaults.withCredentials = true;

type User = {
    fullName: string;
    email: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profileImg: string;
    admin: boolean;
    isVerified: boolean;
}
type userState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: RegisterInputState) => Promise<void>;
    login: (input: LoginInputState) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    forgetPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    logout: () => Promise<void>;
    checkingTokenAuth: () => Promise<void>;
    updateProfile: (input: FormData) => Promise<void>;

}
export const useUserStore = create<userState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: true,
            loading: false,
            //signup api implementation
            signup: async (input: RegisterInputState) => {
                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_END_POINT}/signUp`, input)
                    if (response.data.success) {
                        toast.success(response.data.message)
                        set({ loading: false, isAuthenticated: true, user: response.data.user })
                    }
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        // This is an Axios error
                        toast.error(error.response?.data?.message || 'Something went wrong');
                    } else if (error instanceof Error) {
                        // A general JS error
                        toast.error(error.message);
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                    set({ loading: false });
                }
            },
            login: async (input: LoginInputState) => {
                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_END_POINT}/login`, input)
                    if (response.data.success) {
                        toast.success(response.data.message)
                        set({ loading: false, isAuthenticated: true, user: response.data.user })
                    }
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        // This is an Axios error
                        console.log(error.response?.data?.message)
                        toast.error(error.response?.data?.message || 'Something went wrong');
                    } else if (error instanceof Error) {
                        // A general JS error
                        toast.error(error.message);
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                    set({ loading: false });
                }
            },
            verifyEmail: async (verificationCode: string) => {
                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_END_POINT}/verifyEmail`, { verificationCode })
                    if (response.data.success) {
                        toast.success(response.data.message)
                        set({ loading: false, isAuthenticated: true, user: response.data.user })
                    }
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        // This is an Axios error
                        toast.error(error.response?.data?.message || 'Something went wrong');
                    } else if (error instanceof Error) {
                        // A general JS error
                        toast.error(error.message);
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                    set({ loading: false });
                }
            },
            forgetPassword: async (email: string) => {
                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_END_POINT}/forgetPassword`, { email })
                    if (response.data.success) {
                        toast.success(response.data.message)
                        set({ loading: false })
                    }
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        // This is an Axios error
                        toast.error(error.response?.data?.message || 'Something went wrong');
                    } else if (error instanceof Error) {
                        // A general JS error
                        toast.error(error.message);
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                    set({ loading: false });
                }
            },
            resetPassword: async (token: string, newPassword: string) => {
                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_END_POINT}/resetPassword/${token}`, { newPassword })
                    if (response.data.success) {
                        toast.success(response.data.message)
                        set({ loading: false })
                    }
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        // This is an Axios error
                        toast.error(error.response?.data?.message || 'Something went wrong');
                    } else if (error instanceof Error) {
                        // A general JS error
                        toast.error(error.message);
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                    set({ loading: false });
                }
            },
            logout: async () => {
                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_END_POINT}/logout`)
                    if (response.data.success) {
                        toast.success(response.data.message)
                        set({ loading: false, isAuthenticated: false, user: null })
                    }
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        // This is an Axios error
                        toast.error(error.response?.data?.message || 'Something went wrong');
                    } else if (error instanceof Error) {
                        // A general JS error
                        toast.error(error.message);
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                    set({ loading: false });
                }
            },
            checkingTokenAuth: async () => {
                try {
                    set({ isCheckingAuth: true })
                    const response = await axios.get(`${API_END_POINT}/check-auth`)
                    if (response.data.success) {
                        set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
                    }
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        // This is an Axios error
                        toast.error(error.response?.data?.message || 'Something went wrong');
                    } else if (error instanceof Error) {
                        // A general JS error
                        toast.error(error.message);
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                    set({ isAuthenticated: false, isCheckingAuth: false });
                }
            },
            updateProfile: async (input: FormData) => {
                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_END_POINT}/updateProfile`, input)
                    toast.success(response.data.message)
                    set({ loading: false, user: response.data.user, isAuthenticated: true })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        toast.error(error.response?.data?.message || 'Something went wrong');
                    } else if (error instanceof Error) {
                        toast.error(error.message);
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                    set({ loading: false });
                }
            }
        }),
        {
            name: 'user-name',
            storage: createJSONStorage(() => localStorage),
        }
    )
);