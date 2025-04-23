import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Restaurant } from "@/stote/useRestaurantStote";
import { RestaurantFormSchema } from "@/schema/RestaurantSchema";
import { Link } from "react-router-dom";

const RestaurantCard = ({
    restaurant,
    setIsSheetOpen,
    setInput,
    setIsEditMode,
    setSelctedId
}: {
    restaurant: Restaurant;
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setInput: React.Dispatch<React.SetStateAction<RestaurantFormSchema>>;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setSelctedId: React.Dispatch<React.SetStateAction<string>>;

}) => {
    if (!restaurant) return null;

    const handleEditRestaurant = (restaurant: Restaurant) => {
        setInput({
            restaurantName: restaurant.restaurantName,
            city: restaurant.city,
            country: restaurant.country,
            deliveryTime: restaurant.deliveryTime,
            cuisines: restaurant.cuisines,
            imageFile: undefined,
        });
        setIsEditMode(true);
        setIsSheetOpen(true);
        setSelctedId(restaurant._id)
    };

    return (
        <Card className="w-full max-w-6xl mx-auto my-10 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
            <div className="md:flex">
                {/* Left: Image */}
                <div className="md:w-1/3 w-full h-64 md:h-auto">
                    <img
                        src={restaurant.imageUrl}
                        alt={restaurant.restaurantName}
                        className="w-full h-full object-cover rounded-l-2xl"
                    />
                </div>

                {/* Right: Info */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                        <CardTitle className="text-3xl font-extrabold text-gray-800 mb-2">
                            {restaurant.restaurantName}
                        </CardTitle>
                        <p className="text-gray-500 text-sm mb-1">
                            📍 <span className="capitalize">{restaurant.city}</span>, {restaurant.country}
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                            ⏱️ Delivery Time: <span className="font-semibold text-indigo-600">{restaurant.deliveryTime} mins</span>
                        </p>

                        {/* Cuisines */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {restaurant.cuisines.map((cuisine, idx) => (
                                <Badge
                                    key={idx}
                                    className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs px-3 py-1 rounded-full shadow hover:scale-105 transition-transform"
                                >
                                    {cuisine}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 gap-3">
                        <Link to={`/details/${restaurant._id}`}>
                            <Button
                                variant="outline"
                                className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition-colors"
                            >
                                🍽 View Details
                            </Button>
                        </Link>
                        <Button
                            onClick={() => handleEditRestaurant(restaurant)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                        >
                            ✏️ Edit Restaurant
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RestaurantCard;
