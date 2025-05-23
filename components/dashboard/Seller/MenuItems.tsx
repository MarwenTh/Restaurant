"use client";
import React, { useState, useEffect } from "react";
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
import AddMenuItemModal from "./AddMenuItemModal";
import { useToast } from "@/components/ui/use-toast";
import ViewEditMenuItemModal from "./ViewEditMenuItemModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";

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
  const menuItemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { menuItems, loading, totalMenuItems, refetch } = useMenuItems();
  const { toast } = useToast();

  // Filter items based on search term
  const filteredItems = menuItems?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(item.category) &&
        item.category.some((cat) =>
          cat.toLowerCase().includes(searchTerm.toLowerCase()),
        )),
  );

  // Calculate pagination
  const totalPages = Math.ceil((filteredItems?.length || 0) / menuItemsPerPage);
  const startIndex = (currentPage - 1) * menuItemsPerPage;
  const endIndex = startIndex + menuItemsPerPage;
  const currentItems = filteredItems?.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/menu-item?id=${id}`);
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Menu item deleted successfully",
        });
        refetch();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.error || "Failed to delete menu item",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Card className="animate-fade-in p-3">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <div>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>Manage all your menu here</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <AddMenuItemModal onSuccess={refetch} />
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
                          {currentItems?.map((item) => (
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
                                    <DropdownMenuItem asChild>
                                      <ViewEditMenuItemModal
                                        menuItem={item}
                                        mode="view"
                                        onSuccess={refetch}
                                      />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                      <ViewEditMenuItemModal
                                        menuItem={item}
                                        mode="edit"
                                        onSuccess={refetch}
                                      />
                                    </DropdownMenuItem>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                          className="text-red-600"
                                          onSelect={(e) => e.preventDefault()}
                                        >
                                          <Trash2 size={14} className="mr-2" />{" "}
                                          Delete
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you sure?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete the menu
                                            item.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleDelete(item._id)
                                            }
                                            className="bg-red-600 hover:bg-red-700"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
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
                                      <DropdownMenuItem asChild>
                                        <ViewEditMenuItemModal
                                          menuItem={item}
                                          mode="view"
                                          onSuccess={refetch}
                                        />
                                      </DropdownMenuItem>
                                      <DropdownMenuItem asChild>
                                        <ViewEditMenuItemModal
                                          menuItem={item}
                                          mode="edit"
                                          onSuccess={refetch}
                                        />
                                      </DropdownMenuItem>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <DropdownMenuItem
                                            className="text-red-600"
                                            onSelect={(e) => e.preventDefault()}
                                          >
                                            <Trash2
                                              size={14}
                                              className="mr-2"
                                            />{" "}
                                            Delete
                                          </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>
                                              Are you sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                              This action cannot be undone. This
                                              will permanently delete the menu
                                              item.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>
                                              Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() =>
                                                handleDelete(item._id)
                                              }
                                              className="bg-red-600 hover:bg-red-700"
                                            >
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
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
                                      <DropdownMenuItem asChild>
                                        <ViewEditMenuItemModal
                                          menuItem={item}
                                          mode="view"
                                          onSuccess={refetch}
                                        />
                                      </DropdownMenuItem>
                                      <DropdownMenuItem asChild>
                                        <ViewEditMenuItemModal
                                          menuItem={item}
                                          mode="edit"
                                          onSuccess={refetch}
                                        />
                                      </DropdownMenuItem>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <DropdownMenuItem
                                            className="text-red-600"
                                            onSelect={(e) => e.preventDefault()}
                                          >
                                            <Trash2
                                              size={14}
                                              className="mr-2"
                                            />{" "}
                                            Delete
                                          </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>
                                              Are you sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                              This action cannot be undone. This
                                              will permanently delete the menu
                                              item.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>
                                              Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() =>
                                                handleDelete(item._id)
                                              }
                                              className="bg-red-600 hover:bg-red-700"
                                            >
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
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
                                      <DropdownMenuItem asChild>
                                        <ViewEditMenuItemModal
                                          menuItem={item}
                                          mode="view"
                                          onSuccess={refetch}
                                        />
                                      </DropdownMenuItem>
                                      <DropdownMenuItem asChild>
                                        <ViewEditMenuItemModal
                                          menuItem={item}
                                          mode="edit"
                                          onSuccess={refetch}
                                        />
                                      </DropdownMenuItem>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <DropdownMenuItem
                                            className="text-red-600"
                                            onSelect={(e) => e.preventDefault()}
                                          >
                                            <Trash2
                                              size={14}
                                              className="mr-2"
                                            />{" "}
                                            Delete
                                          </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>
                                              Are you sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                              This action cannot be undone. This
                                              will permanently delete the menu
                                              item.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>
                                              Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() =>
                                                handleDelete(item._id)
                                              }
                                              className="bg-red-600 hover:bg-red-700"
                                            >
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
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
                <strong>
                  {filteredItems?.length === 0 ? 0 : startIndex + 1}
                </strong>{" "}
                -{" "}
                <strong>
                  {Math.min(endIndex, filteredItems?.length || 0)}
                </strong>{" "}
                of <strong>{filteredItems?.length || 0}</strong> items
              </div>
            ) : (
              <div className="flex items-center">
                <span>Loading...</span>
                <FaSpinner size={13} className="animate-spin ml-2" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              variant="ghost"
              size="sm"
              disabled={currentPage === 1 || loading}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </div>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              variant="ghost"
              size="sm"
              disabled={currentPage >= totalPages || loading}
              className="flex items-center"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MenuItems;
