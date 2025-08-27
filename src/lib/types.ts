import type { LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export type RecyclableItem = {
  id: string;
  name:string;
  description: string;
  pricePerKg: number;
  image: string;
  dataAiHint: string;
  categoryId: string;
};
