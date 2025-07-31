import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const gcd = (a: number, b: number): number => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

export const calculateAspectRatio = (
  width: number,
  height: number
): string | null => {
  if (width <= 0 || height <= 0) {
    return null;
  }

  const divisor = gcd(width, height);

  const n = width / divisor;
  const m = height / divisor;

  return `${n}:${m}`;
};
