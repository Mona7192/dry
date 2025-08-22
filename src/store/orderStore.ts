import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  categoryTitle?: string;
  serviceVariant?: string;
  options?: string[];
};

export type CustomOrder = {
  id: string;
  subject: string;
  description: string;
};

export type OrderState = {
  lines: { [id: string]: OrderItem };
  customOrders: CustomOrder[];
  addOrderLine: (item: Partial<OrderItem>) => void;
  removeOrderLine: (id: string) => void;
  addCustomOrder: (subject: string, description: string) => void;
  removeCustomOrder: (id: string) => void;
  total: () => number;
  resetOrders: () => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      lines: {},
      customOrders: [],

      addOrderLine: (item) =>
        set((state) => {
          const lines = { ...state.lines };
          if (item.quantity === 0 && item.id) {
            delete lines[item.id];
          } else if (item.id) {
            lines[item.id] = {
              ...lines[item.id],
              ...item,
              quantity: item.quantity || (lines[item.id]?.quantity || 0) + 1,
            };
          }
          return { lines };
        }),

      removeOrderLine: (id) =>
        set((state) => {
          const lines = { ...state.lines };
          const current = lines[id];
          if (!current) return state;

          const quantity = current.quantity - 1;
          if (quantity > 0) {
            lines[id] = { ...current, quantity };
          } else {
            delete lines[id];
          }
          return { lines };
        }),

      addCustomOrder: (subject, description) => {
        const newOrder: CustomOrder = {
          id: nanoid(),
          subject,
          description,
        };
        set((state) => ({
          customOrders: [...state.customOrders, newOrder],
        }));
      },

      removeCustomOrder: (id) =>
        set((state) => ({
          customOrders: state.customOrders.filter((order) => order.id !== id),
        })),

      total: () =>
        Object.values(get().lines).reduce(
          (sum, line) => sum + line.price * line.quantity,
          0
        ),

      resetOrders: () => {
        set({ lines: {}, customOrders: [] });
        if (typeof window !== "undefined") {
          localStorage.removeItem("order-storage");
        }
      },
    }),
    { name: "order-storage" }
  )
);