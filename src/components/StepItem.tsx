// components/StepItem.tsx

import { ReactNode } from "react";

interface StepItemProps {
  number: number;
  icon: ReactNode;
  title: string;
  description: string;
}

export default function StepItem({ number, icon, title, description }: StepItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* عدد + خط چین + آیکن */}
      <div className="flex items-center mb-4">
        {/* عدد */}
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
          {number}
        </div>

        {/* خط چین */}
        <div className="border-t border-dashed border-gray-400 w-8 mx-2" />

        {/* آیکن */}
        <div className="text-blue-600 text-2xl">
          {icon}
        </div>
      </div>

      {/* متن و توضیح */}
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
