import type { ReactNode } from "react";

type FooterInfoColumnProps = {
  heading: string;
  children: ReactNode;
};

export function FooterInfoColumn({ heading, children }: FooterInfoColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display font-semibold uppercase text-white text-lg">{heading}</h3>
      {children}
    </div>
  );
}
