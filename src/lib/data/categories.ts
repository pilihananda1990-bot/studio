
import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "all", name: "All" },
  { id: "paper", name: "Paper" },
  { id: "plastic", name: "Plastic" },
  { id: "metal", name: "Metal" },
  { id: "glass", name: "Glass" },
  { id: "organic", name: "Organic" },
];

export const getCategoryById = (id: string | undefined) => categories.find(c => c.id === id);
