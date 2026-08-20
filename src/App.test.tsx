import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import { CartProvider } from "./state/CartContext";

function renderApp(initialPath = "/") {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <App />
      </MemoryRouter>
    </CartProvider>,
  );
}

describe("App routing", () => {
  it("navigates to the menu page when 'Our Menu' nav link is clicked", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(screen.getByRole("link", { name: "Our Menu" }));
    expect(screen.getByTestId("menu-page")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Our Menu" })).toHaveClass("text-brand-red");
  });

  it("has Home and Cart nav links pointing to their destinations from any page", () => {
    renderApp("/menu");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute("href", "/cart");
  });

  it("reaches the menu page via the homepage hero link", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(screen.getByRole("link", { name: "View Our Menu" }));
    expect(screen.getByTestId("menu-page")).toBeInTheDocument();
  });

  it("reaches the cart page via the header's Cart nav link", async () => {
    const user = userEvent.setup();
    renderApp("/menu");
    await user.click(screen.getByRole("link", { name: "Cart" }));
    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
  });
});
