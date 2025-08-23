import { create } from "zustand";
import { persist } from "zustand/middleware";

type PickupDeliveryState = {
  name: string
  familyName: string
  phone: string
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
      name: "",
      familyName: "",
      phone: "",
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
          name: "",
          familyName: "",
          phone: "",
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
