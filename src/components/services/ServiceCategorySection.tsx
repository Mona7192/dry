// src/components/ServiceCategorySection.tsx
import { LaundryCategory } from "@/data/services-data";

type Props = {
  category: LaundryCategory;
};

const ServiceCategorySection = ({ category }: Props) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{category.title}</h2>

      <div className="grid grid-cols-1 gap-2">
        {category.items.map((item) => (
          <div key={item.id} className="p-2 border rounded flex justify-between">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>

      {category.note && <p className="mt-2 text-sm text-gray-500">{category.note}</p>}
    </div>
  );
};

export default ServiceCategorySection;
