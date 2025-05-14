import { useRestaurantStore } from "@/stote/useRestaurantStote";
import AvailableMenu from "./AvailableMenu";
import { Badge } from "./ui/badge";
import { PlusCircleIcon, Timer } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "./LoadingPage";
import { Button } from "./ui/button";


const RestaurantDetail = () => {
    const { restaurantId } = useParams()
    const { getRestaurantById, singleRestaurant } = useRestaurantStore()
    const { isLoading } = useQuery({
        queryKey: ["restaurantDetails"],
        queryFn: async () => {
            await getRestaurantById(restaurantId!)
            return [];
        }
    })
    if (isLoading) {

        return <LoadingPage></LoadingPage>
    }
    console.log(singleRestaurant)

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="w-full">
                <div className="relative w-full h-32 md:h-64 lg:h-72">
                    <img
                        src={singleRestaurant?.imageUrl}
                        alt="res_image"
                        className="object-cover w-full h-full rounded-lg shadow-lg"
                    />
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="my-5">
                        <h1 className="font-medium text-xl">{singleRestaurant?.restaurantName}</h1>
                        <div className="flex gap-2 my-2">
                            {singleRestaurant?.cuisines?.map((cuisine: string, idx: number) => (
                                <Badge key={idx}>{cuisine}</Badge>
                            ))}
                        </div>
                        <div className="flex md:flex-row flex-col gap-2 my-5">
                            <div className="flex items-center gap-2">
                                <Timer className="w-5 h-5" />
                                <h1 className="flex items-center gap-2 font-medium">
                                    Delivery Time: <span className="text-[#D19254]">{singleRestaurant?.deliveryTime}</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <AvailableMenu menus={singleRestaurant?.menus || []} />
                    <Link to={`/admin/addMenu/${singleRestaurant?._id}`}>
                        <Button className="bg-button hover:bg-hoverOrange"> Add Menu

                            <PlusCircleIcon className="w-5 h-5" />

                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;