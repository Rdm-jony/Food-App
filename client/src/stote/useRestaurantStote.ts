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
    restaurantName: string;
    restaurantId:string;
}

export type RestaurantState = {
    loading: boolean;
    restaurant: Restaurant[];
    retaurantnameList: string[];
    getRestaurantListName: () => Promise<void>;
    getRestaurant: () => Promise<void>;
    searchedRestaurant: Restaurant[];
    appliedFilter: string[];
    singleRestaurant: Restaurant | null,
    // restaurantOrder: Orders[],
    createRestaurant: (formData: FormData) => Promise<void>;
    // getRestaurant: () => Promise<void>;
    updateRestaurant: (formData: FormData) => Promise<void>;
    searchRestaurant: (searchText: string, searchQuery: string, selectedCuisines: unknown[]) => Promise<void>;
    // addMenuToRestaurant: (menu: MenuItem) => void;
    // updateMenuToRestaurant: (menu: MenuItem) => void;
    setAppliedFilter: (value: string) => void;
    resetAppliedFilter: () => void;
    getRestaurantById: (restaurantId: string) => Promise<void>;
    // getRestaurantOrders: () => Promise<void>;
    // updateRestaurantOrder: (orderId: string, status: string) => Promise<void>;
}

const API_END_POINT = "http://localhost:5000/restaurant";
axios.defaults.withCredentials = true;
export const useRestaurantStore = create<RestaurantState>()(persist((set) => ({
    loading: false,
    restaurant: [],
    searchedRestaurant: [],
    appliedFilter: [],
    singleRestaurant: null,
    retaurantnameList: [],
    createRestaurant: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
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
    getRestaurantListName: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/list`);
            if (response.data.success) {

                set({ loading: false, retaurantnameList: response.data.restaurantList });

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
    getRestaurant: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}`);
            if (response.data.success) {
                set({ loading: false, restaurant: response.data.restaurant });
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
    getRestaurantById: async (restaurantId: string) => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
            if (response.data.success) {
                set({ loading: false, singleRestaurant: response.data.restaurant });
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
    updateRestaurant: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
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
    searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: unknown[]) => {
        try {
            set({ loading: true });

            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            params.set("selectedCuisines", selectedCuisines.join(","));

            // await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
            if (response.data.success) {
                set({ loading: false, searchedRestaurant: response.data.restaurants });
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
    setAppliedFilter: (value: string) => {
        set((state) => {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item !== value) : [...state.appliedFilter, value];
            return { appliedFilter: updatedFilter }
        })
    },
    resetAppliedFilter: () => {
        set({ appliedFilter: [] })
    }
}), {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)
}))


