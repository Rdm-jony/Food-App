import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export type MenuItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    restaurantName: string;
}
type MenuState = {
    loading: boolean,
    menu: MenuItem | null,
    groupMenus: GroupedMenus[],
    createMenu: (formData: FormData) => Promise<void>;
    getMenu: () => Promise<void>
}

export type GroupedMenus = {
    restaurantName: string;
    menus: MenuItem[];
};
const API_END_POINT = "http://localhost:5000/menu";
axios.defaults.withCredentials = true;

export const useMenuStore = create<MenuState>()(persist((set) => ({
    loading: false,
    groupMenus: [],
    menu: null,
    createMenu: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            // update restaurant 
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
    getMenu: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/`);
            if (response.data.success) {
                set({ loading: false, groupMenus: response.data.menus });
            }
            // update restaurant 
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
}), {
    name: "menu-name",
    storage: createJSONStorage(() => localStorage)
}))