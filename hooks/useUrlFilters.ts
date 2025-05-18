import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type FilterKeys =
  | "minRating"
  | "preparationTime"
  | "maxPrice"
  | "sortBy"
  | "category"
  | "search";

export type Filters = {
  minRating: number;
  preparationTime: number;
  maxPrice: number;
  sortBy: string;
  category: string;
  search: string;
};

const defaultFilters: Filters = {
  minRating: 0,
  preparationTime: 0,
  maxPrice: 0,
  sortBy: "",
  category: "all",
  search: "",
};

export function useUrlFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  // Initialize filters from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const newFilters = {
      minRating: Number(params.get("minRating")) || 0,
      preparationTime: Number(params.get("preparationTime")) || 0,
      maxPrice: Number(params.get("maxPrice")) || 0,
      sortBy: params.get("sortBy") || "",
      category: params.get("category") || "all",
      search: params.get("search") || "",
    };

    setFilters(newFilters);
  }, [searchParams]);

  // Update URL when filters change
  const updateFilters = useCallback(
    (newFilters: Partial<Filters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);

      const params = new URLSearchParams();

      // Only add non-default values to the URL
      if (updatedFilters.minRating !== defaultFilters.minRating) {
        params.set("minRating", updatedFilters.minRating.toString());
      }

      if (updatedFilters.preparationTime !== defaultFilters.preparationTime) {
        params.set(
          "preparationTime",
          updatedFilters.preparationTime.toString(),
        );
      }

      if (updatedFilters.maxPrice !== defaultFilters.maxPrice) {
        params.set("maxPrice", updatedFilters.maxPrice.toString());
      }

      if (updatedFilters.sortBy !== defaultFilters.sortBy) {
        params.set("sortBy", updatedFilters.sortBy);
      }

      if (updatedFilters.category !== defaultFilters.category) {
        params.set("category", updatedFilters.category);
      }

      if (updatedFilters.search !== defaultFilters.search) {
        params.set("search", updatedFilters.search);
      }

      // Update the URL without refreshing the page
      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;
      router.push(newUrl);
    },
    [filters, router],
  );

  // Reset all filters to default values
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    router.push(window.location.pathname);
  }, [router]);

  // Toggle a filter value (for numeric filters)
  const toggleFilter = useCallback(
    (key: FilterKeys, value: number | string) => {
      // If the same value is selected again, reset it to default
      const currentValue = filters[key];
      const defaultValue =
        key === "sortBy" || key === "category" || key === "search" ? "" : 0;

      const newValue = currentValue === value ? defaultValue : value;
      updateFilters({ [key]: newValue });
    },
    [filters, updateFilters],
  );

  return {
    filters,
    updateFilters,
    resetFilters,
    toggleFilter,
  };
}
