
import type { RecyclableItem } from "@/lib/types";

export const recyclableItems: RecyclableItem[] = [
  {
    id: "item-1",
    name: "PET Bottles",
    pricePerKg: 1.50,
    dirtyPricePerKg: 0.50,
    image: "https://picsum.photos/seed/pet-bottles/600/400",
    category: "Plastic",
    description: "Clear or colored plastic bottles, typically used for beverages. Make sure they are empty, clean, and dry for the best price.",
    preparation: [
      "Ensure bottles are completely empty.",
      "Rinse with water to remove residue.",
      "Remove and discard caps and labels.",
      "Flatten to save space.",
    ],
    accepted: ["Water bottles", "Soda bottles", "Juice containers"],
    prohibited: ["Oily bottles", "Chemical containers", "Plastic bags"],
  },
  {
    id: "item-2",
    name: "Cardboard Boxes",
    pricePerKg: 0.80,
    dirtyPricePerKg: 0.30,
    image: "https://picsum.photos/seed/cardboard/600/400",
    category: "Paper",
    description: "Corrugated cardboard boxes. Please flatten them before pickup to save space and ensure they are dry.",
    preparation: [
        "Remove all tape and shipping labels.",
        "Flatten all boxes completely.",
        "Keep them dry and away from moisture.",
        "Bundle them together if possible.",
    ],
    accepted: ["Shipping boxes", "Shoe boxes", "Cereal boxes (without plastic liner)"],
    prohibited: ["Waxed cardboard", "Greasy pizza boxes", "Wet or moldy cardboard"],
  },
  {
    id: "item-3",
    name: "Aluminum Cans",
    pricePerKg: 12.00,
    dirtyPricePerKg: 8.00,
    image: "https://picsum.photos/seed/aluminum-cans/600/400",
    category: "Metal",
    description: "Beverage cans made of aluminum. Please rinse them out before collection to avoid contaminants.",
    preparation: [
        "Ensure cans are empty.",
        "Rinse them to remove any liquid residue.",
        "You can crush them to save space.",
    ],
    accepted: ["Soda cans", "Beer cans", "Energy drink cans"],
    prohibited: ["Food cans (tin/steel)", "Aerosol cans", "Aluminum foil"],
  },
  {
    id: "item-4",
    name: "Glass Jars",
    pricePerKg: 0.30,
    dirtyPricePerKg: 0.10,
    image: "https://picsum.photos/seed/glass-jars/600/400",
    category: "Glass",
    description: "Glass jars and bottles of any color. Remove lids and rinse thoroughly for the higher price.",
    preparation: [
        "Remove contents and rinse thoroughly.",
        "Separate lids and caps (recycle if possible).",
        "No need to remove paper labels.",
    ],
    accepted: ["Food jars (jam, pickles)", "Beverage bottles (wine, juice)", "Sauce bottles"],
    prohibited: ["Light bulbs", "Ceramics or porcelain", "Window glass", "Mirrors"],
  },
  {
    id: "item-5",
    name: "Newspapers",
    pricePerKg: 1.00,
    dirtyPricePerKg: 0.40,
    image: "https://picsum.photos/seed/newspapers/600/400",
    category: "Paper",
    description: "Old newspapers and magazines. Keep them dry and bundled together. Wet paper has a much lower value.",
     preparation: [
        "Keep them dry.",
        "Remove any plastic wrapping.",
        "Tie them in bundles or place in a paper bag.",
    ],
    accepted: ["Newspapers", "Magazines", "Junk mail", "Office paper"],
    prohibited: ["Wet paper", "Paper towels or tissues", "Paper contaminated with food"],
  },
  {
    id: "item-6",
    name: "Steel Cans",
    pricePerKg: 2.50,
    dirtyPricePerKg: 1.00,
    image: "https://picsum.photos/seed/steel-cans/600/400",
    category: "Metal",
    description: "Canned food containers. Please clean them before pickup to receive the best price.",
    preparation: [
        "Ensure cans are empty.",
        "Rinse thoroughly to remove food residue.",
        "You can place the lid inside the can.",
    ],
    accepted: ["Canned vegetable/fruit tins", "Soup cans", "Pet food cans"],
    prohibited: ["Aluminum cans", "Paint cans", "Aerosol cans"],
  },
];

export const getItemById = (id: string | undefined) => {
  if (!id) return undefined;
  return recyclableItems.find(item => item.id === id);
}
