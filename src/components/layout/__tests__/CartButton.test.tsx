import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CartProvider, CART_STORAGE_KEY } from "../../../state/CartContext";
import { SiteHeader } from "../SiteHeader";

describe("CartButton via SiteHeader", () => {
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

  it("renders the cart badge with the count from the cart session", () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <SiteHeader />
        </CartProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId("cart-badge")).toHaveTextContent("3");
  });
});
