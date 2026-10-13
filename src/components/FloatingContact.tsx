import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { useOffer } from "../context/OfferContext";
import { CONTACT, tgLink, waLink } from "../i18n";
import { PhoneIcon, TelegramIcon, WhatsAppIcon } from "./Icons";
import { CountdownInline } from "./Countdown";
import { cn } from "../utils/cn";

/** Mobile-first sticky contact dock: appears after the hero, hides near the final CTA. */
export function FloatingContact() {
  const { t, lang } = useLang();
  const { offer, remaining } = useOffer();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.7;
      let nearContact = false;
      if (contact) {
        const r = contact.getBoundingClientRect();
        nearContact = r.top < window.innerHeight && r.bottom > 0;
      }
      setVisible(past && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-4 bottom-4 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inset-x-auto sm:right-6 sm:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="glass relative flex items-center gap-1.5 rounded-full border border-ink-900/8 p-1.5 shadow-lift">
        {offer && (
          <a
            href="#pricing"
            className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap text-ink-950 shadow-md sm:left-auto sm:right-4 sm:translate-x-0"
          >
            {t.offer.dockBadge} · <CountdownInline ms={remaining} />
          </a>
        )}
        <span className="hidden pl-3 pr-1 text-[13px] font-medium text-ink-700 sm:inline">{t.floating.label}</span>
        <a
          href={waLink(lang, offer?.code)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 text-[14px] font-medium text-white transition-transform active:scale-95 sm:flex-none sm:px-4"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon width={18} height={18} />
          <span className="sm:hidden">WhatsApp</span>
        </a>
        <a
          href={tgLink(lang, offer?.code)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#2aabee] px-4 text-[14px] font-medium text-white transition-transform active:scale-95 sm:flex-none"
          aria-label="Telegram"
        >
          <TelegramIcon width={18} height={18} />
          <span className="sm:hidden">Telegram</span>
        </a>
        <a
          href={`tel:${CONTACT.phoneIntl}`}
          className="grid h-11 w-11 place-items-center rounded-full bg-ink-950 text-white transition-transform active:scale-95"
          aria-label={`${t.hero.call} ${CONTACT.phoneDisplay}`}
        >
          <PhoneIcon width={18} height={18} />
        </a>
      </div>
    </div>
  );
}
