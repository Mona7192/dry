// src/data/other-services-data.ts

export type ServiceItem = {
  id: string
  name: string
  price: number
  description: string
}

export type otherServicesCategory = {
  id: string
  title: string
  categories: string[]    // مثل Clean & Iron, Iron Only, Child
  options: string[]       // مثل Hanger, Folded
  items: ServiceItem[]
  note:string

}

// services-data.ts

export const otherServicesCategories: otherServicesCategory[] = [
  {
    id: "shoe-repair",
    title: "Shoe Repair",
    categories: ["Basic Repair", "Deep Clean"],
    options: ["Add Polish", "Add Waterproofing"],
    items: [
      {
        id: "heel-repair",
        name: "Heel Repair",
        price: 9,
        description: "Fix worn or damaged heels on your favorite shoes.",
      },
      {
        id: "sole-replacement",
        name: "Sole Replacement",
        price: 15,
        description: "Replace worn-out soles with durable new ones.",
      },
    ],
    note: "For specialized leather repairs, please contact customer service.",
  },
  {
    id: "alterations",
    title: "Repairs & Alterations",
    categories: ["Minor Repair", "Full Alteration"],
    options: ["Express Service", "Hand Finish"],
    items: [
      {
        id: "pant-hem",
        name: "Pant Hemming",
        price: 10,
        description: "Shorten or adjust pant lengths for a perfect fit.",
      },
      {
        id: "zipper-replacement",
        name: "Zipper Replacement",
        price: 12,
        description: "Replace broken or stuck zippers on any garment.",
      },
    ],
    note: "For specialized leather repairs, please contact customer service."
  },
]
