"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  ArrowUpDown,
  Filter,
  Download,
  Upload,
  User,
  Building2,
  Truck,
  ShieldAlert,
  EyeOff,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "available" | "out_of_stock" | "hidden";
  image: string;
  popularity: number;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    category: "Pizza",
    price: 14.99,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D",
    popularity: 95,
  },
  {
    id: "2",
    name: "Pasta Carbonara",
    category: "Pasta",
    price: 12.99,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGElMjBjYXJib25hcmF8ZW58MHx8MHx8fDA%3D",
    popularity: 87,
  },
  {
    id: "3",
    name: "Tiramisu",
    category: "Dessert",
    price: 7.99,
    status: "out_of_stock",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGlyYW1pc3V8ZW58MHx8MHx8fDA%3D",
    popularity: 78,
  },
  {
    id: "4",
    name: "Caprese Salad",
    category: "Salad",
    price: 9.99,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FwcmVzZSUyMHNhbGFkfGVufDB8fDB8fHww",
    popularity: 65,
  },
  {
    id: "5",
    name: "Garlic Bread",
    category: "Appetizer",
    price: 5.99,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1619535860434-a54f8cec9ad7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D",
    popularity: 70,
  },
  {
    id: "6",
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 8.99,
    status: "hidden",
    image:
      "https://images.unsplash.com/photo-1611329695518-1763319fffce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hvY29sYXRlJTIwbGF2YSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
    popularity: 82,
  },
];

const statusColors = {
  available: "bg-green-100 text-[#28C76F] border-[#28C76F]",
  out_of_stock: "bg-red-100 text-[#EA5455] border-[#EA5455]",
  hidden: "bg-gray-100 text-gray-500 border-gray-500",
};

const statusLabels = {
  available: "Available",
  out_of_stock: "Out of Stock",
  hidden: "Hidden",
};

const MenuItems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
          <div>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>Manage all your menu here</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="bg-[#FF9F43] hover:bg-[#FF9F43]/90 cursor-pointer">
              <Plus size={16} className="mr-2" /> Add New Item
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export Users
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative mb-6 mx-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
            <Input
              placeholder="Search menu..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-2 sm:grid-cols-4 gap-1">
              <TabsTrigger
                value="all"
                className="text-xs sm:text-sm cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                All Items
              </TabsTrigger>
              <TabsTrigger
                value="available"
                className="text-xs sm:text-sm cursor-pointer"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Available
              </TabsTrigger>
              <TabsTrigger
                value="out_of_stock"
                className="text-xs sm:text-sm cursor-pointer"
              >
                <ShieldAlert className="h-4 w-4 mr-2" />
                Out of Stock
              </TabsTrigger>
              <TabsTrigger
                value="hidden"
                className="text-xs sm:text-sm cursor-pointer"
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Hidden
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Popularity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="h-12 w-12 rounded-md overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${statusColors[item.status]} border`}
                            >
                              {statusLabels[item.status]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-full max-w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-[#FF9F43] h-2 rounded-full"
                                  style={{ width: `${item.popularity}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">
                                {item.popularity}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye size={14} className="mr-2" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit size={14} className="mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 size={14} className="mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="available" className="mt-0">
              {/* Filter for available items */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    {/* Similar table structure with filtered items */}
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Popularity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems
                        .filter((item) => item.status === "available")
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="h-12 w-12 rounded-md overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${statusColors[item.status]} border`}
                              >
                                {statusLabels[item.status]}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-full max-w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-[#FF9F43] h-2 rounded-full"
                                    style={{ width: `${item.popularity}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">
                                  {item.popularity}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye size={14} className="mr-2" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit size={14} className="mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 size={14} className="mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="out_of_stock" className="mt-0">
              {/* Filter for out_of_stock items */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Popularity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems
                        .filter((item) => item.status === "out_of_stock")
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="h-12 w-12 rounded-md overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${statusColors[item.status]} border`}
                              >
                                {statusLabels[item.status]}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-full max-w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-[#FF9F43] h-2 rounded-full"
                                    style={{ width: `${item.popularity}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">
                                  {item.popularity}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye size={14} className="mr-2" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit size={14} className="mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 size={14} className="mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hidden" className="mt-0">
              {/* Filter for hidden items */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Popularity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems
                        .filter((item) => item.status === "hidden")
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="h-12 w-12 rounded-md overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${statusColors[item.status]} border`}
                              >
                                {statusLabels[item.status]}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-full max-w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-[#FF9F43] h-2 rounded-full"
                                    style={{ width: `${item.popularity}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">
                                  {item.popularity}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye size={14} className="mr-2" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit size={14} className="mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 size={14} className="mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
