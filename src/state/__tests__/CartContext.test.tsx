import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CartProvider, useCart, CART_STORAGE_KEY } from "../CartContext";

function CartCountProbe() {
  const { count } = useCart();
  return <span data-testid="count">{count}</span>;
}

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("reports 0 items when no cart session exists", () => {
    render(
      <CartProvider>
        <CartCountProbe />
      </CartProvider>,
    );
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("reports the number of items stored in the cart session", () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ id: "1" }, { id: "2" }, { id: "3" }]),
    );
    render(
      <CartProvider>
        <CartCountProbe />
      </CartProvider>,
    );
    expect(screen.getByTestId("count")).toHaveTextContent("3");
  });
});
