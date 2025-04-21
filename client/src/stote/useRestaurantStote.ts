import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    menus: MenuItem[];
    imageUrl: string;
}
export type MenuItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}
export type RestaurantState = {
    loading: boolean;
    restaurant: Restaurant | null;
    // searchedRestaurant: SearchedRestaurant | null;
    // appliedFilter: string[];
    // singleRestaurant: Restaurant | null,
    // restaurantOrder: Orders[],
    createRestaurant: (formData: FormData) => Promise<void>;
    // getRestaurant: () => Promise<void>;
    // updateRestaurant: (formData: FormData) => Promise<void>;
    // searchRestaurant: (searchText: string, searchQuery: string, selectedCuisines: any) => Promise<void>;
    // addMenuToRestaurant: (menu: MenuItem) => void;
    // updateMenuToRestaurant: (menu: MenuItem) => void;
    // setAppliedFilter: (value: string) => void;
    // resetAppliedFilter: () => void;
    // getSingleRestaurant: (restaurantId: string) => Promise<void>;
    // getRestaurantOrders: () => Promise<void>;
    // updateRestaurantOrder: (orderId: string, status: string) => Promise<void>;
}

const API_END_POINT = "http://localhost:5000/restaurant";
axios.defaults.withCredentials = true;
export const useRestaurantStore = create<RestaurantState>()(persist((set) => ({
    loading: false,
    restaurant: null,
    createRestaurant: async (formData: FormData) => {
        try {
            // set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                // set({ loading: false });
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
    }
}), {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)
}))