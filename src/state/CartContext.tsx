import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export const CART_STORAGE_KEY = "forno-rosso-cart";

type CartItem = { id: string };

type CartContextValue = {
  count: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readStoredItems(): CartItem[] {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items] = useState<CartItem[]>(readStoredItems);
  const value = useMemo(() => ({ count: items.length }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
