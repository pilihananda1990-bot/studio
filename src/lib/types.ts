
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

export type Province = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  provinceId: string;
  name: string;
};

export type Subdistrict = {
  id: string;
  cityId: string;
  name: string;
};

export type Village = {
  id: string;
  subdistrictId: string;
  name: string;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  points: number;
};

export type RedemptionOption = {
  id: string;
  name: string;
  points: number;
  icon: string; // URL or path to icon
};

export type RedemptionCategory = {
  id: string;
  name: string;
  items: RedemptionOption[];
};
