import axios from "axios";
import { create } from "zustand";
import { CheckoutSessionRequest, OrderState } from "../types/oredrType";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
const API_END_POINT = "http://localhost:5000/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(persist((set) => ({
    loading: false,
    orders: [],
    createCheckoutSession: async (checkoutSessionRequest: CheckoutSessionRequest) => {
        try {
            set({ loading: true })
            const response = await axios.post(`${API_END_POINT}/create-checkout-session`, checkoutSessionRequest)
            if (response.data.success) {
                window.location.href = response.data.url
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Something went wrong')
            } else if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('An unexpected error occurred')
            }
        }
    },
    getOrderDetails: async () => {
        try {
            set({ loading: true })
            const response = await axios.get(`${API_END_POINT}/get-order-details`)
            if (response.data.success) {
                set({ orders: response.data.orders })
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Something went wrong')
            } else if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('An unexpected error occurred')
            }
        }
    }
}), {
    name: "order-store",
    storage: createJSONStorage(() => localStorage)
}))
