import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

type CustomOrder = {
  id: string;
  subject: string;
  description: string;
};

type CustomOrderState = {
  customOrders: CustomOrder[];
  addCustomOrder: (subject: string, description: string) => void;
  deleteCustomOrder: (id: string) => void;
  updateCustomOrder: (id: string, subject: string, description: string) => void;
};

export const useCustomOrderStore = create<CustomOrderState>()(
  persist(
    (set) => ({
      customOrders: [],

      addCustomOrder: (subject, description) =>
        set((state) => ({
          customOrders: [
            ...state.customOrders,
            { id: nanoid(), subject, description },
          ],
        })),

      deleteCustomOrder: (id) =>
        set((state) => ({
          customOrders: state.customOrders.filter((item) => item.id !== id),
        })),

      updateCustomOrder: (id, subject, description) =>
        set((state) => ({
          customOrders: state.customOrders.map((item) =>
            item.id === id ? { ...item, subject, description } : item
          ),
        })),
    }),
    { name: "custom-orders-storage" }
  )
);
