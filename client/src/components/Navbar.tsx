import { Link } from "react-router-dom";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
import { HandPlatter, Hotel, ListOrdered, LogOut, Menu, MenuSquare, Moon, ShoppingCart, Sun, User } from "lucide-react";
import { useUserStore } from "@/stote/useUserStore";
import { useCartStore } from "@/stote/useCartStore";

const Navbar = () => {
    const { cart } = useCartStore()
    const { logout } = useUserStore()
    const handleLogout = async () => {
        await logout()
    }
    return (
        <div className="flex justify-between mx-10 py-5">
            <div>
                <h2 className="text-2xl font-bold">Food App</h2>
            </div>
            <div className="md:flex gap-10 items-center hidden">
                <Link to="/">Home</Link>
                <Link to="/">Profile</Link>
                <Link to="/">Order</Link>
                <Menubar className="border-none shadow-none">
                    <MenubarMenu >
                        <MenubarTrigger className="cursor-pointer menubar-trigger">Dashboard</MenubarTrigger>
                        <MenubarContent className="bg-white">
                            <MenubarItem>
                                <Link to="/">Resturant</Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link to="/">Menu</Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link to="/">Orders</Link>
                            </MenubarItem>

                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem >
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            Dark
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
                <Link to="/cart">
                    <div className="relative">
                        <ShoppingCart ></ShoppingCart>
                        <Button size="icon" className="bg-red-500 absolute rounded-full w-5 h-5 text-xs top-[-15px] left-3">{cart.length}</Button>
                    </div>
                </Link>
                <Menubar className="border-none p-0 m-0 shadow-none">
                    <MenubarMenu>
                        <MenubarTrigger className="p-0">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                <Link to="/" className="flex gap-2">
                                    <User></User>
                                    <span>Profile</span>
                                </Link>

                            </MenubarItem>
                            <MenubarItem>
                                <Link onClick={() => handleLogout()} to="/signIn" className="flex gap-2">
                                    <LogOut></LogOut>
                                    <span>Logout</span>
                                </Link>
                            </MenubarItem>

                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

            </div>
            <div className="md:hidden">
                <Mobile></Mobile>
            </div>
        </div>

    );
};

export default Navbar;

const Mobile = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger className="bg-gray-200 p-2 rounded-full">
                    <Menu size={20} />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription className="h-full mt-10">
                            <div className="flex flex-col h-full">

                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-black">Food App</h2>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon">
                                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                                    <span className="sr-only">Toggle theme</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Light</DropdownMenuItem>
                                                <DropdownMenuItem>Dark</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <Separator className="my-5" />
                                    <div className="space-y-5">
                                        <Link to="/" className="flex gap-2 items-center">
                                            <User />
                                            <span>Profile</span>
                                        </Link>
                                        <Link to="/" className="flex gap-2 items-center">
                                            <HandPlatter />
                                            <span>Order</span>
                                        </Link>
                                        <Link to="/" className="flex gap-2 items-center">
                                            <ShoppingCart />
                                            <span>Cart <span>(0)</span></span>
                                        </Link>
                                        <Link to="/" className="flex gap-2 items-center">
                                            <MenuSquare />
                                            <span>Menu</span>
                                        </Link>
                                        <Link to="/" className="flex gap-2 items-center">
                                            <Hotel />
                                            <span>Restaurant</span>
                                        </Link>
                                        <Link to="/" className="flex gap-2 items-center">
                                            <ListOrdered />
                                            <span>Restaurant Orders</span>
                                        </Link>
                                    </div>
                                </div>



                            </div>
                        </SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                        <div className="bg-gray-100 rounded-b-md mt-5">
                            <div className="flex gap-5 p-2 items-center mb-5">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h2 className="font-bold text-black">JONY DAS</h2>
                            </div>
                            <Button className="bg-button w-full">Logout</Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
};
