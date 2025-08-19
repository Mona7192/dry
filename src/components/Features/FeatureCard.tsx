import { LucideIcon } from 'lucide-react'

interface Props {
  title: string
  description: string
  icon: LucideIcon
}

export default function FeatureCard({ title, description, icon: Icon }: Props) {
  return (
    <div className="bg-white outline-[#B1B1B1] rounded-xl p-6 text-center hover:shadow-lg transition">
      <div className="flex justify-center mb-4">
        <div className="bg-primary text-white rounded-xs p-3">
          <Icon size={24} />
        </div>
      </div>
       {/* <h4 className="text-lg font-semibold mb-2">{title}</h4> */}
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
