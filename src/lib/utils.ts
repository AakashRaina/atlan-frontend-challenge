import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeId() {
  let id = "";
  let numbers = "0123456789";
  for (let i = 0; i < 4; i++) {
    id += numbers.charAt(Math.floor(Math.random() * 10));
  }
  return id;
}
