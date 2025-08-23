import { useOrderStore } from "@/store/orderStore";
import { useCustomOrderStore } from "@/store/customOrderStore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OrderSummary({ nextHref = "/book-order/pickup-delivery" }: { nextHref?: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  const lines = useOrderStore((state) => state.lines);
  const customOrders = useCustomOrderStore((state) => state.customOrders);
  const total = useOrderStore((state) => state.total());

  const items = Object.values(lines);

  const handleContinue = () => {
    if (!session) {
      router.push(`/login?redirect=${encodeURIComponent(nextHref)}`); // ✅ بفرست لاگین با redirect
    } else {
      router.push(nextHref); // ✅ اگر لاگین بود مستقیماً برو
    }
  };

  // ✅ گروه‌بندی آیتم‌ها بر اساس دسته‌بندی اصلی
  const groupedByMainCategory = items.reduce((acc: any, item: any) => {
    const mainCategory = item.mainCategory || "Other"; // مثلا Laundry یا Bedding
    if (!acc[mainCategory]) acc[mainCategory] = [];
    acc[mainCategory].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-md mx-auto sm:max-w-lg lg:max-w-xl border border-Gray-2">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Selected Services:</h2>

      {/* آیتم‌های سفارش */}
      {items.length > 0 ? (
        <div className="mb-6 space-y-6">
          {Object.entries(groupedByMainCategory).map(([mainCategory, categoryItems]: any) => (
            <div key={mainCategory}>
              <ul className="divide-y divide-gray-200">
                {categoryItems.map((item: any) => (
                  <li key={item.id} className="py-4 sm:py-5">
                    <div className="grid grid-cols-12 gap-4 items-center">

                      {/* ستون جزئیات آیتم */}
                      <div className="col-span-6">
                        {item.categoryTitle && (
                          <p className="text-primary font-medium text-sm">
                            {item.categoryTitle}
                          </p>
                        )}
                        <p className="font-medium text-gray-900">{item.name}</p>

                        {item.serviceVariant && (
                          <p className="text-gray-500 text-sm">{item.serviceVariant}</p>
                        )}
                        {item.options && item.options.length > 0 && (
                          <p className="text-gray-500 text-sm mt-1">
                            Options: {item.options.join(", ")}
                          </p>
                        )}
                      </div>

                      {/* ستون تعداد */}
                      <div className="col-span-3 text-center">
                        <span className="text-gray-600 font-medium">
                          {item.quantity}
                        </span>
                      </div>

                      {/* ستون قیمت */}
                      <div className="col-span-3 text-right">
                        <span className="font-semibold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mb-6">No items in your order yet.</p>
      )}

      {/* سفارش‌های سفارشی */}
      {customOrders.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-800">Custom Orders</h3>
          <ul className="divide-y divide-gray-200">
            {customOrders.map((order) => (
              <li key={order.id} className="py-3">
                <p className="font-medium text-gray-900">{order.subject}</p>
                <p className="text-gray-500 text-sm">{order.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* جمع کل */}
      <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-5 mt-5">
        <span>Total:</span>
        <span className="text-primary font-medium">£{total.toFixed(2)}</span>
      </div>

      {/* دکمه Continue */}
      <button
        disabled={items.length === 0 && customOrders.length === 0}
        onClick={handleContinue}
        className={`w-full py-2 rounded-md text-white transition my-5 ${items.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-Secondary hover:border"
          }`}
      >
        Continue to delivery details
      </button>
    </div>
  );
}
