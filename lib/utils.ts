import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
/// this is the tailwind connection file. 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
