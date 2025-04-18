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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/MenuSchema";
import { Loader2, Plus } from "lucide-react";
import React, { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";



const AddMenu = () => {
    const [input, setInput] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    });
    const [open, setOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [error, setError] = useState<Partial<MenuFormSchema>>({});


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
        // api ka kaam start from here

    };

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
            {[1, 2, 3]?.map((menu, idx: number) => (
                <div key={idx} className="mt-6 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
                        <img
                            src='https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ='
                            alt=""
                            className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h1 className="text-lg font-semibold text-gray-800">
                                Pizaa
                            </h1>
                            <p className="text-sm tex-gray-600 mt-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui ratione, incidunt, explicabo sunt nobis veniam eaque illum dolorum eligendi eos reiciendis adipisci illo! Pariatur ex obcaecati quo iure inventore! At!</p>
                            <h2 className="text-md font-semibold mt-2">
                                Price: <span className="text-[#D19254]">80</span>
                            </h2>
                        </div>
                        <Button
                            onClick={() => setEditOpen(true)}
                            size={"sm"}
                            className="bg-button hover:bg-hoverOrange mt-2"
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            ))}
            <EditMenu editOpen={editOpen} setEditOpen={setEditOpen}></EditMenu>
        </div>
    );
};

export default AddMenu;