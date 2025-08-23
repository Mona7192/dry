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
    <div className="flex flex-col items-center text-center border border-white p-3.5 rounded-2xl">
      {/* عدد + خط چین + آیکن */}
      <div className="flex items-center mb-4">
        {/* عدد */}
        <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-extrabold text-4xl">
          {number}
        </div>

        {/* خط چین */}
        <div className="border-t border-dashed border-white w-20 mx-2" />

        {/* آیکن */}
        <div className="text-blue-600 text-9xl">
          {icon}
        </div>
      </div>

      {/* متن و توضیح */}
      <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
      <p className="text-sm text-white">{description}</p>
    </div>
  );
}
