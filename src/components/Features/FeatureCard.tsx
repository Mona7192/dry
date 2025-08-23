import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  icon: LucideIcon;
}

export default function FeatureCard({ title, icon: Icon }: Props) {
  return (
    <div className="flex items-center bg-white rounded-lg p-4 m-2 border border-Gray-2">
      <div className="bg-primary text-white rounded-md p-2 mr-4">
        <Icon size={24} />
      </div>
      <p className="text-gray-700 text-sm">{title}</p>
    </div>
  );
}