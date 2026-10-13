import { useState, type FormEvent } from "react";
import { useLang } from "../context/LanguageContext";
import { CONTACT, waLink, tgLink } from "../i18n";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";
import { WhatsAppIcon, TelegramIcon, Check } from "./Icons";
import { cn } from "../utils/cn";

const inputCls =
  "h-12 w-full rounded-2xl border border-ink-200 bg-white px-4 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-300 hover:border-ink-300 focus:border-ink-950 focus:ring-4 focus:ring-ink-950/8 focus:outline-none";
const labelCls = "mb-1.5 block text-[13px] font-medium text-ink-700";

const SERVICES_EN = [
  "New website",
  "Website redesign",
  "E-commerce store",
  "Custom software / CMS",
  "SEO & local search",
  "Other",
];
const SERVICES_AM = [
  "አዲስ ድረ-ገጽ",
  "ድረ-ገጽ ማሻሻያ",
  "ኢ-ኮሜርስ መደብር",
  "ብጁ ሶፍትዌር / CMS",
  "SEO እና የአካባቢ ፍለጋ",
  "ሌላ",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const { lang } = useLang();
  const services = lang === "am" ? SERVICES_AM : SERVICES_EN;

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // spam trap — must stay empty
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const copy =
    lang === "am"
      ? {
          eyebrow: "ያግኙን",
          title: "ለንግድዎ ድረ-ገጽ እንገንባ",
          subtitle: "ቅጹን ይሙሉ — በ24 ሰዓት ውስጥ እንመልሳለን። ወይም በቀጥታ WhatsApp / Telegram ይላኩ።",
          name: "ሙሉ ስም *",
          namePh: "ለምሳሌ፦ አበበ ከበደ",
          business: "የንግድ ስም",
          businessPh: "ለምሳሌ፦ ሰላም ፈርኒቸር",
          email: "ኢሜይል",
          emailPh: "you@example.com",
          phone: "ስልክ / WhatsApp",
          phonePh: "09xx xxx xxx",
          service: "የሚፈልጉት አገልግሎት",
          servicePh: "አንዱን ይምረጡ",
          message: "መልእክት *",
          messagePh: "ስለ ፕሮጀክትዎ በአጭሩ ይንገሩን…",
          submit: "መልእክት ላክ",
          sending: "እየተላከ ነው…",
          success: "ተቀብለናል! በቅርቡ እንመልሳለን።",
          error: "አልተሳካም። እንደገና ይሞክሩ ወይም WhatsApp ይጠቀሙ።",
          or: "ወይም በቀጥታ",
          needContact: "ኢሜይል ወይም ስልክ ያስፈልጋል",
        }
      : {
          eyebrow: "Contact",
          title: "Tell us about your project",
          subtitle: "Fill the form — we reply within 24 hours. Or message us directly on WhatsApp / Telegram.",
          name: "Full name *",
          namePh: "e.g. Abebe Kebede",
          business: "Business name",
          businessPh: "e.g. Selam Furniture",
          email: "Email",
          emailPh: "you@example.com",
          phone: "Phone / WhatsApp",
          phonePh: "09xx xxx xxx",
          service: "Service needed",
          servicePh: "Select one",
          message: "Project message *",
          messagePh: "Briefly describe what you need…",
          submit: "Send message",
          sending: "Sending…",
          success: "Got it! We'll get back to you soon.",
          error: "Something went wrong. Try again or use WhatsApp.",
          or: "Or reach us directly",
          needContact: "Email or phone is required",
        };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) return; // bot filled hidden field
    if (!name.trim() || !message.trim()) return;
    if (!email.trim() && !phone.trim()) {
      setErrorMsg(copy.needContact);
      setStatus("error");
      return;
    }
    if (!supabaseConfigured || !supabase) {
      setErrorMsg(copy.error);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const { error } = await supabase.from("contact_submissions").insert({
      name: name.trim(),
      business_name: business.trim() || null,
      email: email.trim() || null,
      phone: phone.trim() || null,
      service_needed: service || null,
      message: message.trim(),
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 300) : null,
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message || copy.error);
      return;
    }

    setStatus("success");
    setName("");
    setBusiness("");
    setEmail("");
    setPhone("");
    setService("");
    setMessage("");
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" delay={80}>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-[28px] border border-ink-900/8 bg-white p-10 text-center shadow-soft">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check width={28} height={28} />
                </span>
                <p className="mt-5 text-[17px] font-semibold text-ink-950">{copy.success}</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-[14px] font-medium text-ink-500 underline-offset-4 hover:text-ink-950 hover:underline"
                >
                  {lang === "am" ? "ሌላ መልእክት ላክ" : "Send another message"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-[28px] border border-ink-900/8 bg-white p-6 shadow-soft sm:p-8"
                noValidate
              >
                {/* honeypot — hidden from users */}
                <input
                  type="text"
                  name="company_website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="cf-name">
                      {copy.name}
                    </label>
                    <input
                      id="cf-name"
                      required
                      className={inputCls}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={copy.namePh}
                      maxLength={120}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="cf-business">
                      {copy.business}
                    </label>
                    <input
                      id="cf-business"
                      className={inputCls}
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder={copy.businessPh}
                      maxLength={120}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="cf-email">
                      {copy.email}
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      className={inputCls}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={copy.emailPh}
                      maxLength={160}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="cf-phone">
                      {copy.phone}
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      className={inputCls}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={copy.phonePh}
                      maxLength={40}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className={labelCls} htmlFor="cf-service">
                    {copy.service}
                  </label>
                  <select
                    id="cf-service"
                    className={cn(inputCls, "appearance-none")}
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">{copy.servicePh}</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label className={labelCls} htmlFor="cf-message">
                    {copy.message}
                  </label>
                  <textarea
                    id="cf-message"
                    required
                    rows={4}
                    className="w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-300 hover:border-ink-300 focus:border-ink-950 focus:ring-4 focus:ring-ink-950/8 focus:outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={copy.messagePh}
                    maxLength={2000}
                  />
                </div>

                {status === "error" && (
                  <p className="mt-3 text-[14px] font-medium text-red-600" role="alert">
                    {errorMsg || copy.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-ink-950 text-[15px] font-medium text-white transition-all duration-300 hover:bg-ink-800 active:scale-[0.98] disabled:opacity-60",
                  )}
                >
                  {status === "loading" ? copy.sending : copy.submit}
                </button>
              </form>
            )}
          </Reveal>

          <Reveal className="lg:col-span-2" delay={140}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-[28px] border border-ink-900/8 bg-ink-50/80 p-6 sm:p-8">
              <div>
                <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-400">{copy.or}</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={waLink(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25d366] text-[15px] font-medium text-white transition-transform active:scale-95"
                  >
                    <WhatsAppIcon width={18} height={18} />
                    WhatsApp
                  </a>
                  <a
                    href={tgLink(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#2aabee] text-[15px] font-medium text-white transition-transform active:scale-95"
                  >
                    <TelegramIcon width={18} height={18} />
                    Telegram
                  </a>
                  <a
                    href={`tel:${CONTACT.phoneIntl}`}
                    className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink-200 bg-white text-[15px] font-medium text-ink-900 transition-colors hover:border-ink-400"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-500">
                {lang === "am"
                  ? "በሰዓታት ውስጥ እንመልሳለን። ቅዳሜ–እሁድም ጭምር።"
                  : "We usually reply within a few hours — including weekends."}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
