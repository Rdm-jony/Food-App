import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RestaurantFormSchema, restaurantFormSchema } from "@/schema/RestaurantSchema";
import { useRestaurantStore } from "@/stote/useRestaurantStote";
import { useQuery } from "@tanstack/react-query";

import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import LoadingPage from "@/components/LoadingPage";

const AddRestaurant = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedId, setSelctedId] = useState("")
    const { createRestaurant, getRestaurant, restaurant, updateRestaurant } = useRestaurantStore()
    const [input, setInput] = useState<RestaurantFormSchema>({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined,
    });
    const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});


    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === "number" ? Number(value) : value });
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = restaurantFormSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            console.log(fieldErrors)
            setErrors(fieldErrors as Partial<RestaurantFormSchema>);
            return;
        }
        // add restaurant api implementation start from here
        const formData = new FormData();
        formData.append("restaurantName", input.restaurantName);
        formData.append("city", input.city);
        formData.append("country", input.country);
        formData.append("deliveryTime", String(input.deliveryTime));
        formData.append("cuisines", input.cuisines.join(","));
        if (input.imageFile) {
            formData.append("imageFile", input.imageFile);
        }
        if (isEditMode) {
            formData.append("retsuarantId", selectedId);
            await updateRestaurant(formData)
            return;
        }
        await createRestaurant(formData)

    };

    const { isLoading } = useQuery({
        queryKey: ["restaurant"],
        queryFn: async () => {
            await getRestaurant()
            return [];
        }
    })
    if (isLoading) {

        return <LoadingPage></LoadingPage>
    }
    const loading = false
    // const restaurant = false
    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between items-center">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
                    Available Restaurant
                </h1>

                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger><Button onClick={() => setInput({
                        restaurantName: "",
                        city: "",
                        country: "",
                        deliveryTime: 0,
                        cuisines: [],
                        imageFile: undefined,
                    })} className="bg-button hover:bg-hoverOrange">
                        <Plus className="mr-2" />
                        Add Restaurant
                    </Button></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                <div>
                                    <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
                                    <form onSubmit={submitHandler}>
                                        <div className="md:grid grid-cols-1 gap-6 space-y-2 md:space-y-0">
                                            {/* Restaurant Name  */}
                                            <div>
                                                <Label>Restaurant Name</Label>
                                                <Input
                                                    type="text"
                                                    name="restaurantName"
                                                    value={input.restaurantName}
                                                    onChange={changeEventHandler}
                                                    placeholder="Enter your restaurant name"
                                                />
                                                {errors && (
                                                    <span className="text-xs text-red-600 font-medium">
                                                        {errors.restaurantName}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <Label>City</Label>
                                                <Input
                                                    type="text"
                                                    name="city"
                                                    value={input.city}
                                                    onChange={changeEventHandler}
                                                    placeholder="Enter your city name"
                                                />
                                                {errors && (
                                                    <span className="text-xs text-red-600 font-medium">
                                                        {errors.city}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Country</Label>
                                                <Input
                                                    type="text"
                                                    name="country"
                                                    value={input.country}
                                                    onChange={changeEventHandler}
                                                    placeholder="Enter your country name"
                                                />
                                                {errors && (
                                                    <span className="text-xs text-red-600 font-medium">
                                                        {errors.country}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Delivery Time</Label>
                                                <Input
                                                    type="number"
                                                    name="deliveryTime"
                                                    value={input.deliveryTime}
                                                    onChange={changeEventHandler}
                                                    placeholder="Enter your delivery time"
                                                />
                                                {errors && (
                                                    <span className="text-xs text-red-600 font-medium">
                                                        {errors.deliveryTime}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Cuisines</Label>
                                                <Input
                                                    type="text"
                                                    name="cuisines"
                                                    value={input.cuisines}
                                                    onChange={(e) =>
                                                        setInput({ ...input, cuisines: e.target.value.split(",") })
                                                    }
                                                    placeholder="e.g. Momos, Biryani"
                                                />
                                                {errors && (
                                                    <span className="text-xs text-red-600 font-medium">
                                                        {errors.cuisines}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Upload Restaurant Banner</Label>
                                                <Input
                                                    onChange={(e) =>
                                                        setInput({
                                                            ...input,
                                                            imageFile: e.target.files?.[0] || undefined,
                                                        })
                                                    }
                                                    type="file"
                                                    accept="image/*"
                                                    name="imageFile"
                                                />
                                                {errors && (
                                                    <span className="text-xs text-red-600 font-medium">
                                                        {errors.imageFile?.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="my-5 w-fit">
                                            {loading ? (
                                                <Button disabled className="bg-button hover:bg-hoverOrange">
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Please wait
                                                </Button>
                                            ) : (
                                                <Button type="submit" className="bg-button hover:bg-hoverOrange">
                                                    {isEditMode
                                                        ? "Update Your Restaurant"
                                                        : "Add Your Restaurant"}
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

            </div>
            <div>
                {
                    restaurant?.map((item) => <RestaurantCard key={item._id} setSelctedId={setSelctedId} setIsSheetOpen={setIsSheetOpen} setInput={setInput} setIsEditMode={setIsEditMode} restaurant={item}></RestaurantCard>)
                }
            </div>
        </div>
    );
};

export default AddRestaurant;