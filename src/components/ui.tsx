import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";
import { ArrowRight, PhoneIcon, TelegramIcon, WhatsAppIcon } from "./Icons";
import { CONTACT, tgLink, waLink } from "../i18n";
import { useLang } from "../context/LanguageContext";
import { useOffer } from "../context/OfferContext";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "telegram" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  arrow?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-950 text-white hover:bg-ink-800 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_8px_24px_-8px_rgba(10,10,11,0.45)]",
  secondary: "bg-white text-ink-900 border border-ink-200 hover:border-ink-400 hover:bg-ink-50",
  ghost: "text-ink-700 hover:text-ink-950 hover:bg-ink-100",
  whatsapp: "bg-[#25d366] text-white hover:bg-[#1fbf5b] shadow-[0_8px_24px_-8px_rgba(37,211,102,0.6)]",
  telegram: "bg-[#2aabee] text-white hover:bg-[#1d9bdc] shadow-[0_8px_24px_-8px_rgba(42,171,238,0.6)]",
  white: "bg-white text-ink-950 hover:bg-ink-100 shadow-[0_8px_24px_-8px_rgba(255,255,255,0.35)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
};

export function Button({ variant = "primary", size = "md", className, children, arrow, ...rest }: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-all duration-300 ease-out active:scale-[0.98] select-none",
        variants[variant],
        sizes[size],
        arrow && "btn-arrow",
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight width={16} height={16} />}
    </a>
  );
}

export function WhatsAppButton({ size = "md", className, children }: { size?: Size; className?: string; children?: ReactNode }) {
  const { lang, t } = useLang();
  const { offer } = useOffer();
  return (
    <Button variant="whatsapp" size={size} href={waLink(lang, offer?.code)} target="_blank" rel="noopener noreferrer" className={className}>
      <WhatsAppIcon width={18} height={18} />
      {children ?? t.hero.whatsapp}
    </Button>
  );
}

export function TelegramButton({ size = "md", className, children, variant = "telegram" }: { size?: Size; className?: string; children?: ReactNode; variant?: Variant }) {
  const { t, lang } = useLang();
  const { offer } = useOffer();
  return (
    <Button variant={variant} size={size} href={tgLink(lang, offer?.code)} target="_blank" rel="noopener noreferrer" className={className}>
      <TelegramIcon width={18} height={18} />
      {children ?? t.hero.telegram}
    </Button>
  );
}

export function CallButton({ size = "md", className, variant = "secondary" }: { size?: Size; className?: string; variant?: Variant }) {
  const { t } = useLang();
  return (
    <Button variant={variant} size={size} href={`tel:${CONTACT.phoneIntl}`} className={className}>
      <PhoneIcon width={17} height={17} />
      {t.hero.call} {CONTACT.phoneDisplay}
    </Button>
  );
}

export function Eyebrow({ children, className, light }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em]",
        light ? "text-white/60" : "text-accent-600",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-white/60" : "bg-accent-500")} />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 text-balance text-[2rem] font-semibold leading-[1.08] tracking-tightest sm:text-[2.75rem] lg:text-[3.25rem]",
          light ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-5 text-balance text-[17px] leading-relaxed sm:text-lg", light ? "text-white/60" : "text-ink-500")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
