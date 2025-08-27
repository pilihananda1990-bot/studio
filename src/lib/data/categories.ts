
import { Newspaper, Archive, Trash2, GlassWater, Leaf } from "lucide-react";
import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "paper", name: "Paper", icon: Newspaper },
  { id: "cardboard", name: "Cardboard", icon: Archive },
  { id: "plastic", name: "Plastic", icon: Trash2 },
  { id: "glass", name: "Glass", icon: GlassWater },
  { id: "organic", name: "Organic", icon: Leaf },
];

export const getCategoryById = (id: string | undefined) => categories.find(c => c.id === id);
