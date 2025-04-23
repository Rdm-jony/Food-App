import mongoose from "mongoose";

export interface IMenu {
    name: string;
    description: string;
    price: number;
    image: string;
    restaurantName: string
    user: mongoose.Schema.Types.ObjectId
}

export interface IMenuDocument extends IMenu {
    createdAt: Date;
    updatedAt: Date;
}

const menuSchema = new mongoose.Schema<IMenuDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true

    }
}, { timestamps: true });

export const Menu = mongoose.model("Menu", menuSchema);