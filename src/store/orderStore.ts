import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface OrderLine {
  id: string;
  name: string;
  price: number;
  quantity: number;
  categoryTitle?: string;
}

interface OrderStore {
  lines: Record<string, OrderLine>;
  addOrderLine: (item: OrderLine) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeOrderLine: (id: string) => void;
  resetOrders: () => void;
  total: () => number;
}

export const useOrderStore = create<OrderStore>()(
  devtools(
    (set, get) => ({
      lines: {},

      addOrderLine: (item) => {
        // بررسی اینکه آیتم valid است
        if (!item || typeof item !== 'object') {
          console.warn('Invalid item passed to addOrderLine:', item);
          return;
        }

        set((state) => {
          const lines = { ...state.lines };

          if (item.quantity === 0 && item.id) {
            // حذف آیتم اگر quantity صفر است
            delete lines[item.id];
          } else if (item.quantity > 0 && item.id) {
            // اضافه یا آپدیت آیتم
            lines[item.id] = { ...item };
          }

          return { lines };
        });
      },

      updateQuantity: (id, quantity) => {
        if (!id || quantity < 0) {
          console.warn('Invalid parameters for updateQuantity:', { id, quantity });
          return;
        }

        set((state) => {
          const lines = { ...state.lines };

          if (quantity === 0) {
            delete lines[id];
          } else if (lines[id]) {
            lines[id] = { ...lines[id], quantity };
          }

          return { lines };
        });
      },

      removeOrderLine: (id) => {
        if (!id) {
          console.warn('Invalid id passed to removeOrderLine:', id);
          return;
        }

        set((state) => {
          const lines = { ...state.lines };
          delete lines[id];
          return { lines };
        });
      },

      resetOrders: () => {
        set({ lines: {} });
      },

      total: () => {
        const { lines } = get();
        return Object.values(lines).reduce((sum, line) => {
          if (typeof line.price === 'number') {
            return sum + (line.price * line.quantity);
          }
          return sum;
        }, 0);
      },
    }),
    {
      name: 'order-store',
    }
  )
);