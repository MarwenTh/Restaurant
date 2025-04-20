import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Tunisian dinar (TND)
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with TND symbol
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)} TND`;
}
