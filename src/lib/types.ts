
import { LucideIcon } from "lucide-react";

export type Category = {
    id: string;
    name: string;
};

export type RecyclableItem = {
  id:string;
  name:string;
  pricePerKg:number;
  dirtyPricePerKg: number;
  image:string;
  category:string;
  description:string;
  preparation: string[];
  accepted: string[];
  prohibited: string[];
};

export type Notification = {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
    href: string;
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
  icon: string;
};

export type RedemptionCategory = {
  id: string;
  name: string;
  items: RedemptionOption[];
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
