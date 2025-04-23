import { Card, CardContent } from "@/components/ui/card";
import { GroupedMenus } from "@/stote/useMenuStore";
import { Delete, Edit } from "lucide-react";




const AvailableMenuAdmin = ({ data }: { data: GroupedMenus[] }) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-8">
                No menus available.
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {data.map((restaurant, idx) => (
                <Card key={idx} className="shadow-xl border border-gray-200">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-purple-700 mb-4">
                            🍽️ {restaurant.restaurantName}
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Image</th>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Description</th>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Price</th>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Edit</th>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {restaurant.menus.map((menu) => (
                                        <tr key={menu._id}>
                                            <td className="px-4 py-2">
                                                <img
                                                    src={menu.image}
                                                    alt={menu.name}
                                                    className="w-14 h-14 object-cover rounded-md"
                                                />
                                            </td>
                                            <td className="px-4 py-2 font-medium text-gray-800">{menu.name}</td>
                                            <td className="px-4 py-2 text-gray-600">{menu.description}</td>
                                            <td className="px-4 py-2 font-semibold text-green-600">₹{menu.price}</td>
                                            <td className="px-4 py-2 font-semibold text-green-600"><Edit></Edit></td>
                                            <td className="px-4 py-2 font-semibold text-red-600"><Delete></Delete></td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AvailableMenuAdmin;
