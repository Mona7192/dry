// src/data/duvet-bedding-data.ts

export type ServiceItem = {
  id: string
  name: string
  price: number
}

export type BeddingCategory = {
  id: string
  title: string
  categories: string[]    // Clean & Iron, Iron Only, etc.
  options: string[]       // Hanger, Folded, etc.
  items: ServiceItem[]
  note?: string
}

export const beddingCategories: BeddingCategory[] = [
  {
    id: "duvets",
    title: "Duvets",
    categories: ["Clean & Iron", "Iron Only"],
    options: ["Hanger", "Folded"],
    items: [
      { id: "duvet_single_clean_hanger", name: "Single Duvet - Clean & Iron - On Hanger", price: 10 },
      { id: "duvet_single_clean_folded", name: "Single Duvet - Clean & Iron - Folded", price: 10 },
      { id: "duvet_double_clean_hanger", name: "Double Duvet - Clean & Iron - On Hanger", price: 14 },
      { id: "duvet_double_clean_folded", name: "Double Duvet - Clean & Iron - Folded", price: 14 },
    ],
  },
  {
    id: "pillows",
    title: "Pillows",
    categories: ["Clean & Iron", "Iron Only"],
    options: ["Folded"],
    items: [
      { id: "pillow_standard_clean", name: "Standard Pillow - Clean & Iron", price: 5 },
      { id: "pillow_memory_clean", name: "Memory Foam Pillow - Clean & Iron", price: 6 },
    ],
  },
  {
    id: "blankets",
    title: "Blankets",
    categories: ["Clean & Iron", "Iron Only"],
    options: ["Folded"],
    items: [
      { id: "blanket_fleece", name: "Fleece Blanket - Clean & Iron", price: 7 },
      { id: "blanket_wool", name: "Wool Blanket - Clean & Iron", price: 9 },
    ],
  },
]
