// components/Icon.tsx
import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;      // آیکون از lucide-react
  size?: number;         // اندازه px
  color?: string;        // رنگ
  className?: string;    // کلاس Tailwind اضافی
}

export default function Icon({ icon: IconComponent, size = 24, color = 'currentColor', className = '' }: IconProps) {
  return <IconComponent size={size} color={color} className={className} />;
}
