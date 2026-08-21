import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "../HomePage";

describe("HomePage", () => {
  it("renders a hero CTA link pointing to the menu page", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "View Our Menu" })).toHaveAttribute("href", "/menu");
  });
});
