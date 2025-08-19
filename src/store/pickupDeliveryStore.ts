import { create } from "zustand";
import { persist } from "zustand/middleware";

type PickupDeliveryState = {
  postalCode: string;
  fullAddress: string;
  driverNote: string;
  pickupDate: string;
  pickupTime: string;
  deliveryDate: string;
  deliveryTime: string;
  setField: (field: keyof PickupDeliveryState, value: string) => void;
  reset: () => void;
};

export const usePickupDeliveryStore = create<PickupDeliveryState>()(
  persist(
    (set) => ({
      postalCode: "",
      fullAddress: "",
      driverNote: "",
      pickupDate: "",
      pickupTime: "",
      deliveryDate: "",
      deliveryTime: "",

      setField: (field, value) => set({ [field]: value }),

      reset: () =>
        set({
          postalCode: "",
          fullAddress: "",
          driverNote: "",
          pickupDate: "",
          pickupTime: "",
          deliveryDate: "",
          deliveryTime: "",
        }),
    }),
    { name: "pickup-delivery-storage" }
  )
);
