interface Props {
  service: {
    key: string
    label: string
    items: { name: string; price: string }[]
  }
  onOrderClick: (item: any) => void
}

export default function PricingCard({ service, onOrderClick }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-left">
      <h3 className="text-primary text-xl font-semibold mb-4">{service.label}</h3>
      <ul className="space-y-3">
        {service.items.map((item) => (
          <li key={item.name} className="flex justify-between items-center border-b-1">
            <div>{item.name}</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{item.price}</span>
              <button
                className="text-xs px-2 py-1 font-bold text-primary rounded hover:bg-gray-800"
                onClick={() => onOrderClick({ ...item, service: service.label })}
              >
                -{">"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
