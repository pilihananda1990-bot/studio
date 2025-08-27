
import type { RecyclableItem } from "@/lib/types";

export const items: RecyclableItem[] = [
  {
    id: "item-1",
    categoryId: "paper",
    name: "Newspapers",
    description: "Old newspapers and magazines. Please ensure they are dry and not contaminated with food waste.",
    pricePerKg: 0.5,
    image: "https://picsum.photos/600/400?random=1",
    dataAiHint: "newspapers stack"
  },
  {
    id: "item-2",
    categoryId: "paper",
    name: "Office Paper",
    description: "Standard A4/Letter sized office paper, white or colored. Shredded paper is also accepted.",
    pricePerKg: 0.7,
    image: "https://picsum.photos/600/400?random=2",
    dataAiHint: "office paper"
  },
  {
    id: "item-3",
    categoryId: "cardboard",
    name: "Cardboard Boxes",
    description: "Corrugated cardboard boxes. Please flatten them before pickup to save space.",
    pricePerKg: 0.4,
    image: "https://picsum.photos/600/400?random=3",
    dataAiHint: "cardboard boxes"
  },
  {
    id: "item-4",
    categoryId: "plastic",
    name: "Plastic Bottles (PET)",
    description: "Clear or light blue plastic bottles, typically used for water and soft drinks. Please rinse and remove caps.",
    pricePerKg: 1.2,
    image: "https://picsum.photos/600/400?random=4",
    dataAiHint: "plastic bottles"
  },
  {
    id: "item-5",
    categoryId: "plastic",
    name: "Milk Jugs (HDPE)",
    description: "Opaque plastic jugs used for milk and water. Please rinse before collection.",
    pricePerKg: 1.0,
    image: "https://picsum.photos/600/400?random=5",
    dataAiHint: "milk jugs"
  },
  {
    id: "item-6",
    categoryId: "glass",
    name: "Glass Jars",
    description: "Food jars made of clear, green, or brown glass. Labels can be left on, but please rinse.",
    pricePerKg: 0.3,
    image: "https://picsum.photos/600/400?random=6",
    dataAiHint: "glass jars"
  },
    {
    id: "item-7",
    categoryId: "glass",
    name: "Glass Bottles",
    description: "Beverage bottles made of clear, green, or brown glass. Please rinse them out.",
    pricePerKg: 0.3,
    image: "https://picsum.photos/600/400?random=7",
    dataAiHint: "glass bottles"
  },
  {
    id: "item-8",
    categoryId: "organic",
    name: "Kitchen Scraps",
    description: "Fruit and vegetable peels, coffee grounds, and eggshells. No meat, dairy, or oily foods.",
    pricePerKg: 0.1,
    image: "https://picsum.photos/600/400?random=8",
    dataAiHint: "compost scraps"
  }
];

export const getItemsByCategoryId = (categoryId: string) => items.filter(i => i.categoryId === categoryId);
export const getItemById = (id: string | undefined) => items.find(i => i.id === id);
