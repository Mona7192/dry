// src/data/services-data.ts

export type ServiceItem = {
  id: string
  name: string
  price: number
}

export type LaundryCategory = {
  id: string
  title: string
  categories: string[]    // مثل Clean & Iron, Iron Only, Child
  options: string[]       // مثل Hanger, Folded
  items: ServiceItem[]
}

export const laundryCategories: LaundryCategory[] = [
  {
    id: "tshirts",
    title: "T-Shirts",
    categories: ["Clean & Iron", "Iron Only", "Child"],
    options: ["Hanger", "Folded"],
    items: [
      { id: "tshirt_plain_hanger", name: "Shirt: Wash & Iron - On Hanger", price: 2.2 },
      { id: "tshirt_plain_folded", name: "Shirts: Wash & Iron - Folded", price: 2.2 },
      { id: "tshirt_ladies_hanger", name: "Ladies Shirt: Wash & Iron - On Hanger", price: 2.2 },
      { id: "tshirt_ladies_folded", name: "Ladies Shirt: Wash & Iron - Folded", price: 2.2 },
    ],
  },
  {
    id: "underwear",
    title: "Underwear",
    categories: ["Clean & Iron", "Iron Only"],
    options: ["Folded"],
    items: [
      { id: "underwear_men", name: "Men’s Underwear - Folded", price: 1.2 },
      { id: "underwear_ladies", name: "Ladies Underwear - Folded", price: 1.5 },
    ],
  },
  // سایر دسته‌ها...
]
