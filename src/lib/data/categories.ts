
import { Leaf, Newspaper, Wine, Trash2, GlassWater } from "lucide-react";
import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "all", name: "All", icon: Trash2 },
  { id: "paper", name: "Paper", icon: Newspaper },
  { id: "plastic", name: "Plastic", icon: GlassWater },
  { id: "metal", name: "Metal", icon: Trash2 },
  { id: "glass", name: "Glass", icon: Wine },
  { id: "organic", name: "Organic", icon: Leaf },
];

export const getCategoryById = (id: string | undefined) => categories.find(c => c.id === id);
