type LogoMarkProps = {
  letter: string;
  size?: "header" | "footer";
};

const SIZE_CLASSES: Record<Required<LogoMarkProps>["size"], string> = {
  header: "h-10 w-10 text-xl rounded-logo-badge",
  footer: "h-9 w-9 text-lg rounded-logo-badge",
};

export function LogoMark({ letter, size = "header" }: LogoMarkProps) {
  return (
    <span
      className={`flex items-center justify-center bg-brand-red text-white font-display font-bold ${SIZE_CLASSES[size]}`}
    >
      {letter}
    </span>
  );
}
