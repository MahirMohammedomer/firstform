import { useLang } from "../context/LanguageContext";
import { CONTACT } from "../i18n";
import { LangToggle, Logo } from "./Navbar";
import { MapPin, PhoneIcon, TelegramIcon, WhatsAppIcon } from "./Icons";

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
    <footer className="relative overflow-hidden border-t border-ink-900/8 pt-16 pb-28 sm:pb-16">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-500">{t.footer.tagline}</p>
            <div className="mt-6">
              <LangToggle />
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-400">{t.footer.explore}</p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-[15px] text-ink-700 transition-colors hover:text-ink-950">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-400">{t.footer.contact}</p>
            <ul className="mt-5 space-y-3 text-[15px] text-ink-700">
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
