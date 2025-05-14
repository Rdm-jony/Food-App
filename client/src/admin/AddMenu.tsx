import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/MenuSchema";
import { Loader2, Plus } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import { useRestaurantStore } from "@/stote/useRestaurantStote";
import { useMenuStore } from "@/stote/useMenuStore";
import AvailableMenuAdmin from "./AvailableMenuAdmin";
import { useParams } from "react-router-dom";


const AddMenu = () => {
    const { restaurantId } = useParams()
    const { createMenu, getMenu, groupMenus } = useMenuStore()
    const { getRestaurantListName, retaurantnameList } = useRestaurantStore()
    const [input, setInput] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        image: undefined,
        restaurantName: "",
        restaurantId: restaurantId!
    });
    const [open, setOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [error, setError] = useState<Partial<MenuFormSchema>>({});
    // const [selectedMenu,setSelectedMenu]=useState<MenuItem>()

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === "number" ? Number(value) : value });
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = menuSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<MenuFormSchema>);
            return;
        }

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("price", input.price.toString());
        formData.append("restaurantName", input.restaurantName);
        formData.append("restaurantId", restaurantId!);
        if (input.image) {
            formData.append("imageMenu", input.image);
        }
        console.log()
        await createMenu(formData)

    };

    useEffect(() => {
        const fetchRestaurantList = async () => {
            await getRestaurantListName()
            await getMenu()
        }
        fetchRestaurantList()
    }, [])

    const loading = false
    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
                    Available Menus
                </h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button className="bg-button hover:bg-hoverOrange">
                            <Plus className="mr-2" />
                            Add Menus
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add A New Menu</DialogTitle>
                            <DialogDescription>
                                Create a menu that will make your restaurant stand out.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    placeholder="Enter menu name"
                                />
                                {error && (
                                    <span className="text-xs font-medium text-red-600">
                                        {error.name}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Enter menu description"
                                />
                                {error && (
                                    <span className="text-xs font-medium text-red-600">
                                        {error.description}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>Price in (Rupees)</Label>
                                <Input
                                    type="number"
                                    name="price"
                                    value={input.price}
                                    onChange={changeEventHandler}
                                    placeholder="Enter menu price"
                                />
                                {error && (
                                    <span className="text-xs font-medium text-red-600">
                                        {error.price}
                                    </span>
                                )}
                            </div>
                            <div >
                                <Label>Select Restaurant Name</Label>
                                <Select name="restaurantName" value={input.restaurantName} onValueChange={(value) => setInput(prev => ({ ...prev, restaurantName: value }))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Restaurant" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            retaurantnameList?.map((name, idx) => <SelectItem key={idx} value={name}>{name}</SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                                {error && (
                                    <span className="text-xs font-medium text-red-600">
                                        {error.restaurantName}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>Upload Menu Image</Label>
                                <Input
                                    type="file"
                                    name="image"
                                    onChange={(e) =>
                                        setInput({
                                            ...input,
                                            image: e.target.files?.[0] || undefined,
                                        })
                                    }
                                />
                                {error && (
                                    <span className="text-xs font-medium text-red-600">
                                        {error.image?.name}
                                    </span>
                                )}
                            </div>
                            <DialogFooter className="mt-5">
                                {loading ? (
                                    <Button disabled className="bg-button hover:bg-hoverOrange">
                                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button className="bg-button hover:bg-hoverOrange">
                                        Submit
                                    </Button>
                                )}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <AvailableMenuAdmin data={groupMenus || []}></AvailableMenuAdmin>
            <EditMenu editOpen={editOpen} setEditOpen={setEditOpen}></EditMenu>
        </div>
    );
};

export default AddMenu;