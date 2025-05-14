import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MenuItem } from "./useRestaurantStote";

export interface CartItem extends MenuItem {
    quantity: number;
    
}
export type CartState = {
    cart: CartItem[];
    addToCart: (item: MenuItem) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    removeFromTheCart: (id: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(persist((set) => ({
    cart: [],
    addToCart: (item: MenuItem) => {
        set((state) => {
            const exisitingItem = state.cart.find((cartItem) => cartItem._id === item._id);
            if (exisitingItem) {
                return {
                    cart: state?.cart.map((cartItem) => cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                    )
                };
            } else {

                return {
                    cart: [...state.cart, { ...item, quantity: 1 }]
                }
            }
        })
    },

    incrementQuantity: (id: string) => {
        set((state) => ({
            cart: state.cart.map((item) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
        }))
    },
    decrementQuantity: (id: string) => {
        set((state) => ({
            cart: state.cart.map((item) => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
        }))
    },
    removeFromTheCart: (id: string) => {
        set((state) => ({
            cart: state.cart.filter((item) => item._id !== id)
        }))
    },
    clearCart: () => {
        set({ cart: [] });
    },

}),
    {
        name: 'cart-name',
        storage: createJSONStorage(() => localStorage)
    }
))