"use client";

import React from "react";
import { useOrderStore } from "@/store/orderStore";
import { useCustomOrderStore } from "@/store/customOrderStore";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";

const PickupOrderSummary = () => {
  const { lines, total } = useOrderStore();
  const router = useRouter();
  const { customOrders } = useCustomOrderStore();

  const orderItems = Object.values(lines);

  // گروه‌بندی آیتم‌ها بر اساس دسته‌بندی اصلی
  const groupedByMainCategory = orderItems.reduce((acc: any, item: any) => {
    const mainCategory = item.mainCategory || "Other";
    if (!acc[mainCategory]) acc[mainCategory] = [];
    acc[mainCategory].push(item);
    return acc;
  }, {});

  const hasItems = orderItems.length > 0 || customOrders.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4BA3C3] to-[#75C085] p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Order Summary</h2>
            <p className="text-white/80 text-sm">Review your selected services</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Order Items */}
        {orderItems.length > 0 ? (
          <div className="space-y-6 mb-6">
            {Object.entries(groupedByMainCategory).map(([mainCategory, categoryItems]: any) => (
              <div key={mainCategory} className="space-y-3">
                <h3 className="text-sm font-semibold text-[#4BA3C3] uppercase tracking-wider">
                  {mainCategory}
                </h3>
                <div className="space-y-3">
                  {categoryItems.map((item: any) => (
                    <div key={item.id} className="bg-[#F7FFF8] rounded-xl p-4 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          {item.categoryTitle && (
                            <span className="inline-block px-2 py-1 bg-[#4BA3C3]/10 text-[#4BA3C3] text-xs font-medium rounded-md mb-2">
                              {item.categoryTitle}
                            </span>
                          )}
                          <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>

                          {item.serviceVariant && (
                            <p className="text-[#606060] text-sm mb-1">{item.serviceVariant}</p>
                          )}

                          {item.options && item.options.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.options.map((option: any, idx: number) => (
                                <span key={idx} className="px-2 py-0.5 bg-[#75C085]/10 text-[#75C085] text-xs rounded-full">
                                  {option}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="text-right ml-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-[#606060]">Qty:</span>
                            <span className="font-semibold text-[#4BA3C3]">{item.quantity}</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            £{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No items selected yet</h3>
            <p className="text-[#B1B1B1] text-sm">Add some services to get started</p>
          </div>
        )}

        {/* Custom Orders */}
        {customOrders.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#75C085] uppercase tracking-wider mb-3">
              Custom Orders
            </h3>
            <div className="space-y-3">
              {customOrders.map((order: any) => (
                <div key={order.id} className="bg-[#75C085]/5 rounded-xl p-4 border border-[#75C085]/20">
                  <h4 className="font-semibold text-gray-900 mb-1">{order.subject}</h4>
                  <p className="text-[#606060] text-sm">{order.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        {hasItems && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="bg-gradient-to-r from-[#4BA3C3]/5 to-[#75C085]/5 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[#606060] text-sm">Total Amount</span>
                  <div className="font-semibold text-gray-700 text-sm">Including all services</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#4BA3C3]">
                    £{total().toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={() => router.push("/book-order/book")}
          disabled={!hasItems}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 mb-4 ${!hasItems
              ? "bg-[#B1B1B1] cursor-not-allowed"
              : "bg-gradient-to-r from-[#4BA3C3] to-[#75C085] hover:from-[#4BA3C3]/90 hover:to-[#75C085]/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
        >
          Proceed to confirm order
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-full py-3 rounded-xl font-medium text-[#4BA3C3] bg-[#4BA3C3]/5 hover:bg-[#4BA3C3]/10 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to service selection
        </button>

        {/* Footer Note */}
        {hasItems && (
          <p className="text-center text-[#B1B1B1] text-xs mt-4">
            You can review and modify your order before final confirmation
          </p>
        )}
      </div>
    </div>
  );
};

export default PickupOrderSummary;