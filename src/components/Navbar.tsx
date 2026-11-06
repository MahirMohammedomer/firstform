import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "../utils/cn";
import { useLang } from "../context/LanguageContext";
import { Button, TelegramButton, WhatsAppButton } from "./ui";
import { Menu, X } from "./Icons";
import { waLink } from "../i18n";
import { useOffer } from "../context/OfferContext";
import { OfferBar } from "./OfferBar";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <a href="#top" className={cn("group inline-flex items-center gap-2.5 min-w-0", className)} aria-label="Firstform home">
      {/* Forward Cut symbol — the brand mark from the logo sheet. */}
      <span
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[11px] transition-transform duration-500 ease-out group-hover:-rotate-3",
          light ? "bg-white" : "bg-ink-950",
        )}
      >
        <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden>
          <g transform="translate(7.103 8.414) scale(0.3276)">
            <path d="M18 120V24h116l-19 20H51v19h53L84 82H51v38H18Z" fill={light ? "#0a0a0b" : "#ffffff"} />
            <path d="M99 24h35l-19 20H80z" fill="#3b82f6" />
          </g>
        </svg>
      </span>
      <span className="min-w-0 flex flex-col leading-none">
        <span className={cn("text-[17px] font-semibold tracking-tight", light ? "text-white" : "text-ink-950")}>
          First<span className="text-accent-500">form</span>
        </span>
        <span className={cn("hidden sm:block text-[9px] font-medium tracking-[0.12em] uppercase mt-0.5 truncate", light ? "text-white/55" : "text-ink-400")}>
          We make the first impression
        </span>
      </span>
    </a>
  );
}

export function LangToggle({ className, light }: { className?: string; light?: boolean }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className={cn(
        "relative inline-flex h-9 items-center rounded-full p-1 text-[13px] font-medium",
        light ? "bg-white/10 text-white/70" : "bg-ink-100 text-ink-500",
        className,
      )}
    >
      {/*
        The sliding pill is inset by the container's 4px padding. Translating by
        exactly 100% of the pill width lands it on the second button only when
        the track is exactly two equal cells, so the translate is derived from
        the track width instead of the pill width.
      */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full shadow-soft transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          light ? "bg-white" : "bg-white",
          lang === "am" ? "translate-x-[calc(100%+4px)]" : "translate-x-0",
        )}
      />
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "relative z-10 h-7 w-12 rounded-full transition-colors",
          lang === "en" ? "text-ink-950" : light ? "text-white/70" : "text-ink-500",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("am")}
        aria-pressed={lang === "am"}
        lang="am"
        className={cn(
          "relative z-10 h-7 w-12 rounded-full font-ethiopic transition-colors",
          lang === "am" ? "text-ink-950" : light ? "text-white/70" : "text-ink-500",
        )}
      >
        አማ
      </button>
    </div>
  );
}

export function Navbar() {
  const { t, lang } = useLang();
  const { offer } = useOffer();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  /* Escape closes the mobile menu; Tab is trapped inside it while open. */
  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
      menuBtnRef.current?.focus();
      return;
    }
    if (e.key !== "Tab") return;
    const panel = menuPanelRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const activeEl = document.activeElement;
    if (e.shiftKey && (activeEl === first || !panel.contains(activeEl))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && activeEl === last) {
      e.preventDefault();
      first.focus();
    }
  };

  /* Move focus into the dialog when it opens, and back out when it closes. */
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const ids = ["work", "services", "pricing", "why", "faq"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape closes the menu even when focus has escaped the dialog. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* A resize past the lg breakpoint should close the mobile sheet. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#services", label: t.nav.services },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#why", label: t.nav.why },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-ink-950 via-accent-500 to-accent-400 transition-opacity duration-300"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />
        <div className="container-x">
          <OfferBar />
          <nav
            aria-label="Primary"
            className={cn(
              "flex h-14 items-center justify-between rounded-full px-3 pl-5 transition-all duration-500 sm:px-4 sm:pl-6",
              scrolled ? "glass border border-ink-900/8 shadow-soft" : "border border-transparent",
            )}
          >
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => {
                const isActive = active === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-300",
                        isActive ? "bg-ink-950/[0.06] text-ink-950" : "text-ink-600 hover:text-ink-950",
                      )}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <LangToggle className="hidden sm:inline-flex" />
              <Button
                href={waLink(lang, offer?.code)}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="hidden md:inline-flex"
                arrow
              >
                {offer && (
                  <span className="-ml-1 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-1.5 py-0.5 text-[10px] font-bold text-ink-950">
                    {t.offer.off}
                  </span>
                )}
                {t.nav.cta}
              </Button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                ref={menuBtnRef}
                className="grid h-10 w-10 place-items-center rounded-full text-ink-900 transition hover:bg-ink-100 lg:hidden"
              >
                <Menu />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-ink-950/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          ref={menuPanelRef}
          id="mobile-menu"
          className={cn(
            "absolute inset-x-3 top-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[28px] bg-white p-5 shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-y-0 scale-100" : "-translate-y-4 scale-[0.98]",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={onMenuKeyDown}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              ref={closeBtnRef}
              className="grid h-10 w-10 place-items-center rounded-full text-ink-900 transition hover:bg-ink-100"
            >
              <X />
            </button>
          </div>
          <ul className="mt-6 space-y-1">
            {links.map((l, i) => (
              <li
                key={l.href}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[19px] font-medium text-ink-900 transition hover:bg-ink-50"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2.5 border-t border-ink-100 pt-5">
            <WhatsAppButton size="lg" className="w-full" />
            <TelegramButton size="lg" className="w-full" />
            <div className="mt-2 flex justify-center">
              <LangToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
