import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CartProvider, CART_STORAGE_KEY } from "../../../state/CartContext";
import { SiteHeader } from "../SiteHeader";

function renderHeader(initialPath = "/menu") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <CartProvider>
        <SiteHeader />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("SiteHeader", () => {
  beforeEach(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ id: "1" }, { id: "2" }, { id: "3" }]),
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders the logo mark and wordmark", () => {
    renderHeader();
    expect(screen.getByText("F")).toBeInTheDocument();
    expect(screen.getByText("Forno Rosso")).toBeInTheDocument();
  });

  it("renders Home, Our Menu, and Cart nav links pointing to their destinations", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Our Menu" })).toHaveAttribute("href", "/menu");
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute("href", "/cart");
  });

  it("renders a cart button with a numeric item-count badge", () => {
    renderHeader();
    const cartLinks = screen.getAllByRole("link", { name: /cart/i });
    expect(cartLinks.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByTestId("cart-badge")).toHaveTextContent("3");
  });
});
