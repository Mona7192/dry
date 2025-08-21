// src/components/order/OrderSummary.tsx
"use client"
import { useCustomOrderStore } from "@/store/customOrderStore"
import { useOrderStore } from "@/store/orderStore"
import { useRouter } from "next/navigation"

export default function OrderSummary({ nextHref = "/book-order/pickup-delivery" }: { nextHref?: string }) {
    const router = useRouter()
    const lines = useOrderStore((s) => s.lines)
    const total = useOrderStore((s) => s.total)()

    const items = Object.values(lines)
    const customOrders = useCustomOrderStore((s) => s.customOrders)

    const handleContinue = () => {
        const token = localStorage.getItem("token") // فرض می‌کنیم توکن اینجاست
        if (!token) {
            // اگر لاگین نیست → ریدایرکت به لاگین و مسیر فعلی رو ارسال کن
            router.push(`/login?redirect=${encodeURIComponent(nextHref)}`)
        } else {
            // اگر لاگین هست → مستقیم به مسیر بعدی
            router.push(nextHref)
        }
    }

    return (
        <aside className="sticky top-6 border rounded-xl p-4 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            {items.length === 0 ? (
                <p className="text-sm text-gray-500">No items selected yet.</p>
            ) : (
                <ul className="space-y-2 mb-4 max-h-72 overflow-auto pr-2">
                    {items.map((l) => (
                        <li key={l.id} className="flex justify-between text-sm">
                            <div className="flex flex-col">
                                <span className="font-medium">{l.name}</span>
                                <span className="text-xs text-gray-500">
                                    {l.categoryTitle}
                                    {l.serviceVariant ? ` • ${l.serviceVariant}` : ""}
                                    {l.options?.length ? ` • ${l.options.join(", ")}` : ""}
                                </span>
                            </div>
                            <div>
                                {l.quantity} × £{l.price.toFixed(2)}
                            </div>
                        </li>
                    ))}
                    {customOrders.map((item) => (
                        <li key={item.id} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                            <div className="flex flex-col">
                                <span className="font-medium">🛠 {item.subject}</span>
                                <span className="text-xs text-gray-500">{item.description}</span>
                            </div>
                            <div>—</div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex justify-between font-semibold border-t pt-3 mb-4">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
            </div>

            <button
                disabled={items.length === 0 && customOrders.length === 0}
                onClick={handleContinue}
                className={`w-full py-2 rounded-md text-white transition ${items.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-Secondary hover:bg-transparent hover:border hover:text-Gray-1"
                    }`}
            >
                Continue to delivery details
            </button>
        </aside>
    )
}
