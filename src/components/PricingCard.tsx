// components/PricingCard.tsx

interface PricingCardProps {
  title: string;
  price: string;
  description?: string;
}

export default function PricingCard({ title, price, description }: PricingCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      <p className="text-2xl font-bold text-blue-600 mt-4">{price}</p>
    </div>
  );
}
