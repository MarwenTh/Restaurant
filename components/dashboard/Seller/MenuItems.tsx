"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Filter,
  Download,
  Upload,
  Building2,
  ShieldAlert,
  EyeOff,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuItem } from "@/interface";
import useMenuItems from "@/hooks/useMenuItems";
import { HashLoader } from "react-spinners";
import { FaSpinner } from "react-icons/fa6";
import { formatCurrency } from "@/lib/utils";

// const menuItems: MenuItem[] = [];

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
  // const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const menuItemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { menuItems, loading, totalMenuItems } = useMenuItems(
    currentPage,
    menuItemsPerPage,
  );

  const filteredItems = menuItems?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(item.category) &&
        item.category.some((cat) =>
          cat.toLowerCase().includes(searchTerm.toLowerCase()),
        )),
  );

  return (
    <div>
      <Card className="animate-fade-in p-3">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
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
                  Export Menu
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Menu
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

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
            {loading ? (
              <div className="flex justify-center items-center">
                <HashLoader color="ff6b00" />
              </div>
            ) : (
              <>
                <TabsContent value="all" className="mt-0">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                            {/* <TableHead className="">Image</TableHead> */}
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Popularity</TableHead>
                            <TableHead className="text-right pr-2">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredItems?.map((item) => (
                            <TableRow key={item._id}>
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
                              <TableCell>
                                {formatCurrency(item.price)}
                              </TableCell>
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
                                      <Trash2 size={14} className="mr-2" />{" "}
                                      Delete
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
                            <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                            {/* <TableHead className="">Image</TableHead> */}
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Popularity</TableHead>
                            <TableHead className="text-right pr-2">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(filteredItems ?? [])
                            .filter((item) => item.status === "available")
                            .map((item) => (
                              <TableRow key={item._id}>
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
                                <TableCell>
                                  {formatCurrency(item.price)}
                                </TableCell>
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
                                        <Trash2 size={14} className="mr-2" />{" "}
                                        Delete
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
                            <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                            {/* <TableHead className="">Image</TableHead> */}
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Popularity</TableHead>
                            <TableHead className="text-right pr-2">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(filteredItems ?? [])
                            .filter((item) => item.status === "out_of_stock")
                            .map((item) => (
                              <TableRow key={item._id}>
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
                                <TableCell>
                                  {formatCurrency(item.price)}
                                </TableCell>
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
                                        <Trash2 size={14} className="mr-2" />{" "}
                                        Delete
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
                            <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                            {/* <TableHead className="">Image</TableHead> */}
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Popularity</TableHead>
                            <TableHead className="text-right pr-2">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(filteredItems ?? [])
                            .filter((item) => item.status === "hidden")
                            .map((item) => (
                              <TableRow key={item._id}>
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
                                <TableCell>
                                  {formatCurrency(item.price)}
                                </TableCell>
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
                                        <Trash2 size={14} className="mr-2" />{" "}
                                        Delete
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
              </>
            )}
          </Tabs>
        </div>
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {!loading ? (
              <div>
                Showing{" "}
                <strong>{(currentPage - 1) * menuItemsPerPage + 1}</strong> -{" "}
                <strong>
                  {Math.min(currentPage * menuItemsPerPage, totalMenuItems)}
                </strong>{" "}
                of <strong>{totalMenuItems}</strong> users
              </div>
            ) : (
              <div className="flex items-center">
                <span>Loading...</span>
                <FaSpinner size={13} className="animate-spin" />
              </div>
            )}
          </div>
          <div className="flex">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? "" : "cursor-pointer"}`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              variant="ghost"
              size="sm"
              disabled={currentPage * menuItemsPerPage >= totalMenuItems}
              className={`${currentPage * menuItemsPerPage >= totalMenuItems ? "" : "cursor-pointer"}`}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MenuItems;
