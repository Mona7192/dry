"use client"

import { useState } from "react"
import LaundryTab from "@/components/services/LaundryTab"
import BeddingTab from "@/components/services/BeddingTab"
import CustomTab from "@/components/services/CustomTab"
import OtherServicesTab from "@/components/services/OtherServicesTab"
import { laundryCategories } from "@/data/services-data"

const tabs = [
  { id: "laundry", label: "Laundry Services" },
  { id: "bedding", label: "Duvet & Bedding Cleaning" },
  { id: "custom", label: "Custom" },
  { id: "other", label: "Other Services" },
]

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState("laundry")

  return (
    <div className="flex flex-col gap-6 pt-1.5">
      {/* تب‌ها */}
      <div className="flex gap-2 border-b pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-3xl font-semibold ${
              activeTab === tab.id
                ? "bg-Secondary text-white"
                : "rounded-3xl border border-Gray-2 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوای تب‌ها */}
      <div>
        {activeTab === "laundry" && <LaundryTab data={laundryCategories} />}
        {activeTab === "bedding" && <BeddingTab />}
        {activeTab === "custom" && <CustomTab />}
        {activeTab === "other" && <OtherServicesTab />}
      </div>
    </div>
  )
}
