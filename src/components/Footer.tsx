import { useLang } from "../context/LanguageContext";
import { CONTACT } from "../i18n";
import { LangToggle } from "./Navbar";
import { MapPin, PhoneIcon, TelegramIcon, WhatsAppIcon } from "./Icons";

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com",
    path: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.2l7.3-8.3L2.8 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.3 8.3h4.7V24H.3V8.3Zm7.7 0h4.5v2.1h.1c.6-1.2 2.2-2.5 4.5-2.5 4.8 0 5.7 3.2 5.7 7.3V24h-4.7v-7.6c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V24H8V8.3Z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z",
  },
  {
    label: "GitHub",
    href: "https://github.com/MahirMohammedomer",
    path: "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z",
  },
];

const SERVICE_LINKS = [
  { href: "/web-design-ethiopia", label: "Web design" },
  { href: "/web-development-ethiopia", label: "Web development" },
  { href: "/ecommerce-development-ethiopia", label: "E-commerce" },
  { href: "/school-management-system-ethiopia", label: "School systems" },
  { href: "/seo-ethiopia", label: "SEO" },
  { href: "/portfolio", label: "Portfolio" },
];

export function Footer() {
  const { t } = useLang();
  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#services", label: t.nav.services },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#why", label: t.nav.why },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-ink-900/8 bg-white pt-16 pb-28 sm:pb-16">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="inline-flex items-center" aria-label="Firstform home">
              <img src="/logo.svg" alt="Firstform" className="h-9 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-500">{t.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-400 ring-1 ring-ink-900/10 transition hover:bg-ink-950 hover:text-white hover:ring-ink-950"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-400">{t.footer.explore}</p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] text-ink-600 transition-colors hover:text-accent-600">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-400">{t.nav.services}</p>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] text-ink-600 transition-colors hover:text-accent-600">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-400">{t.footer.contact}</p>
            <ul className="mt-5 space-y-3 text-[15px] text-ink-600">
              <li>
                <a href={`tel:${CONTACT.phoneIntl}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-ink-950">
                  <PhoneIcon width={16} height={16} className="text-ink-400" /> {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors hover:text-ink-950">
                  <WhatsAppIcon width={16} height={16} className="text-[#25d366]" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={CONTACT.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors hover:text-ink-950">
                  <TelegramIcon width={16} height={16} className="text-[#2aabee]" /> {CONTACT.telegramHandle}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <MapPin width={16} height={16} className="text-ink-400" /> {t.footer.location}
              </li>
            </ul>
            <div className="mt-6">
              <LangToggle />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ink-900/8 pt-7 text-[13px] text-ink-400 sm:flex-row sm:items-center">
          <p>{t.footer.rights}</p>
          <p>{t.footer.made}</p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 -bottom-[7vw] text-center text-[24vw] leading-none font-bold tracking-tightest text-ink-900/[0.03] select-none"
        aria-hidden
      >
        Firstform
      </div>
    </footer>
  );
}
