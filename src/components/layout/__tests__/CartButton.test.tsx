import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CartProvider, CART_STORAGE_KEY } from "../../../state/CartContext";
import { CartButton } from "../CartButton";

describe("CartButton", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ id: "1" }, { id: "2" }, { id: "3" }]),
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("links to the cart page and renders the badge with the count from the cart session", () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <CartButton />
        </CartProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: /view cart/i })).toHaveAttribute("href", "/cart");
    expect(screen.getByTestId("cart-badge")).toHaveTextContent("3");
  });
});
