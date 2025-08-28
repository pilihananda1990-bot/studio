
import type { RecyclableItem } from "@/lib/types";

export const recyclableItems: RecyclableItem[] = [
  {
    id: "item-1",
    name: "PET Bottles",
    pricePerKg: 1500,
    image: "https://picsum.photos/seed/pet-bottles/300/300",
    category: "Plastic",
    description: "Clear or colored plastic bottles, typically used for beverages. Make sure they are empty, clean, and dry.",
  },
  {
    id: "item-2",
    name: "Cardboard Boxes",
    pricePerKg: 800,
    image: "https://picsum.photos/seed/cardboard/300/300",
    category: "Paper",
    description: "Corrugated cardboard boxes. Please flatten them before pickup to save space.",
  },
  {
    id: "item-3",
    name: "Aluminum Cans",
    pricePerKg: 12000,
    image: "https://picsum.photos/seed/aluminum-cans/300/300",
    category: "Metal",
    description: "Beverage cans made of aluminum. Please rinse them out before collection.",
  },
  {
    id: "item-4",
    name: "Glass Jars",
    pricePerKg: 300,
    image: "https://picsum.photos/seed/glass-jars/300/300",
    category: "Glass",
    description: "Glass jars and bottles of any color. Remove lids and rinse thoroughly.",
  },
  {
    id: "item-5",
    name: "Newspapers",
    pricePerKg: 1000,
    image: "https://picsum.photos/seed/newspapers/300/300",
    category: "Paper",
    description: "Old newspapers and magazines. Keep them dry and bundled together.",
  },
  {
    id: "item-6",
    name: "Steel Cans",
    pricePerKg: 2500,
    image: "https://picsum.photos/seed/steel-cans/300/300",
    category: "Metal",
    description: "Canned food containers. Please clean them before pickup.",
  },
];

export const getItemById = (id: string) => {
  return recyclableItems.find(item => item.id === id);
}
