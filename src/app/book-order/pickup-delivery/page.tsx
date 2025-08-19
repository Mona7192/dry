// app/book-order/pickup-delivery/page.tsx


import AddressSection from "@/components/pickup/AddressSection";
import PickupDeliveryTime from "@/components/pickup/PickupDeliveryTime";
import DriverNote from "@/components/pickup/DriverNote";
import PickupOrderSummary from "@/components/pickup/PickupOrderSummary";
import OrderSteps from "@/components/order/OrderSteps";
import ProtectedPageWrapper from "@/components/ProtectedPageWrapper";

export default async function PickupDeliveryPage() {

  return (
    
    <div className="bg-light px-12 pb-5">
      <OrderSteps />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-12">
        {/* ستون سمت چپ: فرم‌های اصلی */}
        <div className="lg:col-span-2 space-y-6 ">
          <AddressSection />
          <PickupDeliveryTime />
          <DriverNote />
        </div>

        {/* ستون سمت راست: خلاصه سفارش */}
        <div>
          <PickupOrderSummary />
        </div>
      </div>
    </div>
    
  )
}
