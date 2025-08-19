
import OrderSummary from "@/components/order/OrderSummary";
import OrderSteps from "@/components/order/OrderSteps";
import OrderTabs from "@/components/OrderTabs";

export default function BookOrderPage() {
  return (
    <div className="bg-light px-12">
      
        <OrderSteps />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-2.5">
        <div className="lg:col-span-2 rounded-2xl border border-Gray-2 p-4">
          <h2 className="font-bold text-[#2b2b2b] text-xl">What Would You Like Us to Clean?</h2>
          <p className="font-normal text-Gray-1 text-[16px]">Start by choosing the type of cleaning you need. After selecting a service category, you'll be able to pick specific items you'd like cleaned.</p>
          <OrderTabs />
        </div>
      <div>
        <OrderSummary nextHref="/book-order/pickup-delivery" />
      </div>
    </div>
    </div>
    
  );
}
