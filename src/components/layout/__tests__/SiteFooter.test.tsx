import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SITE_INFO } from "../../../config/siteInfo";
import { SiteFooter } from "../SiteFooter";

function renderFooter() {
  return render(
    <MemoryRouter>
      <SiteFooter />
    </MemoryRouter>,
  );
}

describe("SiteFooter", () => {
  it("displays kitchen hours from the static config", () => {
    renderFooter();
    expect(screen.getByText("Kitchen Hours", { exact: false })).toBeInTheDocument();
    for (const row of SITE_INFO.hours) {
      expect(screen.getByText(row.label)).toBeInTheDocument();
      expect(screen.getByText(row.value)).toBeInTheDocument();
    }
  });

  it("displays pizzeria location and contact details from the static config", () => {
    renderFooter();
    expect(screen.getByText("Pizzeria Location", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(SITE_INFO.location.address)).toBeInTheDocument();
    expect(screen.getByText(SITE_INFO.location.phoneLabel)).toBeInTheDocument();
    expect(screen.getByText(SITE_INFO.location.emailLabel)).toBeInTheDocument();
  });

  it("displays the copyright and legal links from the static config", () => {
    renderFooter();
    expect(screen.getByText(SITE_INFO.legal.copyright)).toBeInTheDocument();
    for (const link of SITE_INFO.legal.links) {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  });
});
