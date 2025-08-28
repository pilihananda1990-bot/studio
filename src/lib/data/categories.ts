
import type { PetCategory } from "@/lib/types";

export const categories: PetCategory[] = [
  { id: "all", name: "All", icon: "🐾" },
  { id: "cat", name: "Cat", icon: "😸" },
  { id: "turtle", name: "Turtle", icon: "🐢" },
  { id: "dog", name: "Dog", icon: "🐶" },
  { id: "bird", name: "Bird", icon: "🐦" },
];

export const getCategoryById = (id: string | undefined) => categories.find(c => c.id === id);
