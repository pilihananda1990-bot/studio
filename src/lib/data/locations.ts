
import type { Province, City, Subdistrict, Village } from "@/lib/types";

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


export const getProvinces = () => provinces;
export const getCities = (provinceId: string) => cities.filter(c => c.provinceId === provinceId);
export const getSubdistricts = (cityId: string) => subdistricts.filter(s => s.cityId === cityId);
export const getVillages = (subdistrictId: string) => villages.filter(v => v.subdistrictId === subdistrictId);
