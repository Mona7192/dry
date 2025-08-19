import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  categoryTitle?: string;
  serviceVariant?: string;
  options?: string[];
};

type CustomOrder = {
  id: string;
  subject: string;
  description: string;
};

type OrderState = {
  lines: { [id: string]: OrderItem };
  customOrders: CustomOrder[];
  addItem: (item: Omit<OrderItem, "quantity">) => void;
  removeItem: (id: string) => void;
  addCustomOrder: (subject: string, description: string) => void;
  removeCustomOrder: (id: string) => void;
  total: () => number;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      lines: {},
      customOrders: [],

      addItem: (item) => {
        const current = get().lines[item.id];
        const quantity = current ? current.quantity + 1 : 1;

        set((state) => ({
          lines: {
            ...state.lines,
            [item.id]: {
              ...item,
              quantity,
            },
          },
        }));
      },

      removeItem: (id) => {
        const current = get().lines[id];
        if (!current) return;

        const quantity = current.quantity - 1;
        const updated = { ...get().lines };

        if (quantity > 0) {
          updated[id] = { ...current, quantity };
        } else {
          delete updated[id];
        }

        set({ lines: updated });
      },

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

      removeCustomOrder: (id) => {
        set((state) => ({
          customOrders: state.customOrders.filter(
            (order) => order.id !== id
          ),
        }));
      },

      total: () => {
        const lines = get().lines;
        return Object.values(lines).reduce(
          (sum, l) => sum + l.price * l.quantity,
          0
        );
      },
    }),
    { name: "order-storage" }
  )
);
