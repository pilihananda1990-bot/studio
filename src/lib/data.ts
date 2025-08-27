
import { Newspaper, Archive, Trash2, GlassWater, Leaf } from "lucide-react";
import type { Category, RecyclableItem, Province, City, Subdistrict, Village } from "./types";

export const categories: Category[] = [
  { id: "paper", name: "Paper", icon: Newspaper },
  { id: "cardboard", name: "Cardboard", icon: Archive },
  { id: "plastic", name: "Plastic", icon: Trash2 },
  { id: "glass", name: "Glass", icon: GlassWater },
  { id: "organic", name: "Organic", icon: Leaf },
];

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

// Mock data for Indonesian addresses
const provinces: Province[] = [
    { id: '11', name: 'ACEH' },
    { id: '31', name: 'DKI JAKARTA' },
    { id: '32', name: 'JAWA BARAT' },
];

const cities: City[] = [
    { id: '1101', provinceId: '11', name: 'KAB. ACEH SELATAN' },
    { id: '1171', provinceId: '11', name: 'KOTA BANDA ACEH' },
    { id: '3171', provinceId: '31', name: 'KOTA JAKARTA PUSAT' },
    { id: '3172', provinceId: '31', name: 'KOTA JAKARTA UTARA' },
    { id: '3201', provinceId: '32', name: 'KAB. BOGOR' },
    { id: '3271', provinceId: '32', name: 'KOTA BOGOR' },
];

const subdistricts: Subdistrict[] = [
    { id: '1101010', cityId: '1101', name: 'BAKONGAN' },
    { id: '1171010', cityId: '1171', name: 'MEURAXA' },
    { id: '3171010', cityId: '3171', name: 'GAMBIR' },
    { id: '3171020', cityId: '3171', name: 'SAWAH BESAR' },
    { id: '3201010', cityId: '3201', name: 'CIBINONG' },
    { id: '3271010', cityId: '3271', name: 'BOGOR SELATAN' },
];

const villages: Village[] = [
    { id: '1101010001', subdistrictId: '1101010', name: 'UJONG PADANG' },
    { id: '1171010001', subdistrictId: '1171010', name: 'GAMPONG BARO' },
    { id: '3171010001', subdistrictId: '3171010', name: 'GAMBIR' },
    { id: '3171010002', subdistrictId: '3171010', name: 'CIDENG' },
    { id: '3201010001', subdistrictId: '3201010', name: 'PABUARAN' },
    { id: '3271010001', subdistrictId: '3271010', name: 'BATU TULIS' },
];


export const getCategoryById = (id: string | undefined) => categories.find(c => c.id === id);
export const getItemsByCategoryId = (categoryId: string) => items.filter(i => i.categoryId === categoryId);
export const getItemById = (id: string | undefined) => items.find(i => i.id === id);

// Address data functions
export const getProvinces = () => provinces;
export const getCities = (provinceId: string) => cities.filter(c => c.provinceId === provinceId);
export const getSubdistricts = (cityId: string) => subdistricts.filter(s => s.cityId === cityId);
export const getVillages = (subdistrictId: string) => villages.filter(v => v.subdistrictId === subdistrictId);
