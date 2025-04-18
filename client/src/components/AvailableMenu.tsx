import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const AvailableMenu = () => {
    return (
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">
                Available Menus
            </h1>
            <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
                {[1, 2, 3].map(() => (
                    <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
                        <img src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=" alt="" className="w-full h-40 object-cover" />
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                JONY DAS
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut adipisci, nam enim ad nisi nihil quasi obcaecati necessitatibus ratione vitae ipsum cumque quo temporibus tenetur. Assumenda nesciunt in officia distinctio!</p>
                            <h3 className="text-lg font-semibold mt-4">
                                Price: <span className="text-[#D19254]">₹100</span>
                            </h3>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Button
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