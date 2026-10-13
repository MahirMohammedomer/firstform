import { useLang } from "../context/LanguageContext";
import { CONTACT } from "../i18n";
import { Reveal } from "./Reveal";
import { Button, Eyebrow, TelegramButton, WhatsAppButton } from "./ui";
import { PhoneIcon } from "./Icons";

export function CTA() {
  const { t } = useLang();

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-6 sm:px-6 sm:py-10">
      <Reveal dir="scale">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink-950 px-6 py-20 text-center text-white sm:rounded-[40px] sm:px-12 sm:py-28">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="drift absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-accent-500/25 blur-[140px]" />
            <div className="drift-slow absolute -bottom-40 left-10 h-[400px] w-[400px] rounded-full bg-emerald-400/15 blur-[120px]" />
            <div className="drift absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-amber-300/10 blur-[120px]" style={{ animationDelay: "-10s" }} />
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 100%)",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <Eyebrow light className="justify-center">
              {t.cta.eyebrow}
            </Eyebrow>
            <h2 className="mt-5 text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-tightest sm:text-6xl">{t.cta.title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-white/60 sm:text-xl">{t.cta.subtitle}</p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton size="lg" className="w-full sm:w-auto">
                {t.cta.whatsapp}
              </WhatsAppButton>
              <TelegramButton size="lg" className="w-full sm:w-auto">
                {t.cta.telegram}
              </TelegramButton>
              <Button variant="white" size="lg" href={`tel:${CONTACT.phoneIntl}`} className="w-full sm:w-auto">
                <PhoneIcon width={17} height={17} />
                {CONTACT.phoneDisplay}
              </Button>
            </div>
            <p className="mt-6 text-[13px] text-white/40">{t.cta.micro}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
