// components/PricingRow.tsx

interface PricingRowProps {
  item: string;
  price: string;
  onOrderClick: () => void;
}

export default function PricingRow({ item, price, onOrderClick }: PricingRowProps) {
  return (
    <div className="flex justify-between items-center border-b py-3">
      <span className="text-gray-700">{item}</span>
      <button
        onClick={onOrderClick}
        className="text-blue-600 font-medium hover:underline"
      >
        {price}
      </button>
    </div>
  );
}
