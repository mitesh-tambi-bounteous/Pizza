type SiteWordmarkProps = {
  text: string;
  size?: "header" | "footer";
};

const SIZE_CLASSES: Record<Required<SiteWordmarkProps>["size"], string> = {
  header: "text-4xl",
  footer: "text-3xl",
};

export function SiteWordmark({ text, size = "header" }: SiteWordmarkProps) {
  return (
    <span className={`font-display font-semibold text-white ${SIZE_CLASSES[size]}`}>{text}</span>
  );
}
