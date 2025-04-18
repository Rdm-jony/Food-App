import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import Checkout from "./Checkout";
import { useState } from "react";

const cart = [
    {
        image: "https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=",
        name: "Pizza",
        price: 200,
        quantity: 5
    }
]
const Cart = () => {
    const [open, setOpen] = useState<boolean>(false);


    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button variant="link">Clear All</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Items</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cart.map((item) => (
                        <TableRow>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={item.image} alt="" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell> {item.name}</TableCell>
                            <TableCell> {item.price}</TableCell>
                            <TableCell>
                                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                                    <Button
                                        size={"icon"}
                                        variant={"outline"}
                                        className="rounded-full bg-gray-200"
                                    >
                                        <Minus />
                                    </Button>
                                    <Button
                                        size={"icon"}
                                        className="font-bold border-none"
                                        disabled
                                        variant={"outline"}
                                    >
                                        {item.quantity}
                                    </Button>
                                    <Button
                                        size={"icon"}
                                        className="rounded-full bg-orange hover:bg-hoverOrange"
                                        variant={"outline"}
                                    >
                                        <Plus />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell>{item.price * item.quantity}</TableCell>
                            <TableCell className="text-right">
                                <Button size={"sm"} className="bg-button hover:bg-hoverOrange">
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="text-2xl font-bold">
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">200</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-end my-5">
                <Button
                    onClick={() => setOpen(true)}
                    className="bg-button hover:bg-hoverOrange"
                >
                    Proceed To Checkout
                </Button>
            </div>
            <Checkout open={open} setOpen={setOpen} />
        </div>
    );
};

export default Cart;