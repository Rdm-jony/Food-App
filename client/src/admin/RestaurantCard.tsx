import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Restaurant } from "@/stote/useRestaurantStote"
import { RestaurantFormSchema } from "@/schema/RestaurantSchema"

const RestaurantCard = ({
    restaurant,
    setIsSheetOpen,
    setInput,
    setIsEditMode,
}: {
    restaurant: Restaurant;
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setInput: React.Dispatch<React.SetStateAction<RestaurantFormSchema>>;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    if (!restaurant) return null;

    const handleEditRestaurant = (restaurant: Restaurant) => {
        setInput({
            restaurantName: restaurant.restaurantName,
            city: restaurant.city,
            country: restaurant.country,
            deliveryTime: restaurant.deliveryTime,
            cuisines: restaurant.cuisines,
            imageFile: undefined, // Image won't be re-populated due to browser security
        });
        setIsEditMode(true);
        setIsSheetOpen(true);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto my-8 border border-gray-300 shadow-xl bg-gradient-to-br from-white via-blue-50 to-purple-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <CardHeader className="flex flex-col md:flex-row items-center gap-4">
                <img
                    src={restaurant.imageUrl}
                    alt={restaurant.restaurantName}
                    className="w-full md:w-64 h-40 object-cover rounded-lg border border-purple-300"
                />
                <div className="flex-1">
                    <CardTitle className="text-2xl font-extrabold text-purple-800">{restaurant.restaurantName}</CardTitle>
                    <p className="text-sm text-gray-600">
                        📍 {restaurant.city}, {restaurant.country}
                    </p>
                    <p className="text-sm mt-1">
                        ⏱️ Delivery Time:{" "}
                        <span className="font-semibold text-indigo-600">{restaurant.deliveryTime} mins</span>
                    </p>
                    <div className="flex gap-2 flex-wrap mt-3">
                        {restaurant.cuisines.map((cuisine: string, idx: number) => (
                            <Badge
                                key={idx}
                                className="bg-gradient-to-r from-pink-400 to-orange-300 text-white shadow-md hover:scale-105 transition-transform"
                            >
                                {cuisine}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <Separator className="bg-purple-300" />
            <CardContent className="flex justify-end mt-4">
                <Button onClick={()=>handleEditRestaurant(restaurant)} className="bg-button  text-white">Edit Restaurant</Button>
            </CardContent>
        </Card>
    );
};

export default RestaurantCard;
