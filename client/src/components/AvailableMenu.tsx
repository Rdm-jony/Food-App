import { MenuItem } from "@/stote/useRestaurantStote";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCartStore } from "@/stote/useCartStore";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from "lucide-react";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
    const { addToCart } = useCartStore()
    if (!menus) {
        return null;
    }
    return (
        <div className="md:p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-extrabold mb-6">
                    Available Menus
                </h1>
                
            </div>
            <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
                {menus.map((menu) => (
                    <Card key={menu._id} className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
                        <img src={menu.image} alt="" className="w-full h-40 object-cover" />
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                JONY DAS
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
                            <h3 className="text-lg font-semibold mt-4">
                                Price: <span className="text-[#D19254]">₹{menu.price}</span>
                            </h3>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Button
                                onClick={() => addToCart(menu)}
                                className="w-full bg-button hover:bg-hoverOrange"
                            >
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AvailableMenu;