export type Lang = "en" | "am";

export const CONTACT = {
  phoneDisplay: "0953 850 002",
  phoneIntl: "+251953850002",
  whatsapp: "https://wa.me/251953850002",
  telegram: "https://t.me/mahir_7219",
  telegramHandle: "@mahir_7219",
};

export const waLink = (lang: Lang, code?: string | null) => {
  let msg =
    lang === "am"
      ? "ሰላም ፈርስትፎርም! ለንግዴ ነጻ የድረ-ገጽ ናሙና እፈልጋለሁ።"
      : "Hi Firstform! I'd like a free website prototype for my business.";
  if (code) msg += lang === "am" ? `\nየቅናሽ ኮድ፡ ${code}` : `\nOffer code: ${code}`;
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
};

export const tgLink = (lang: Lang, code?: string | null) => {
  if (!code) return CONTACT.telegram;
  const msg =
    lang === "am"
      ? `ሰላም ፈርስትፎርም! ነጻ የድረ-ገጽ ናሙና እፈልጋለሁ።\nየቅናሽ ኮድ፡ ${code}`
      : `Hi Firstform! I'd like a free website prototype.\nOffer code: ${code}`;
  return `${CONTACT.telegram}?text=${encodeURIComponent(msg)}`;
};

export const fmtETB = (n: number) => n.toLocaleString("en-US");

export const PROJECTS = [
  {
    id: "attikem",
    url: "https://attikem-furniture-landing-page.vercel.app/",
    name: "Attikem Furniture",
    accent: "from-amber-100 via-orange-50 to-white",
  },
  {
    id: "dream",
    url: "https://dazzling-kataifi-e1bc50.netlify.app/",
    name: "Dream Furniture PLC",
    accent: "from-stone-200 via-stone-100 to-white",
  },
  {
    id: "yegar",
    url: "https://soft-axolotl-afc50d.netlify.app/",
    name: "Yegar Nur",
    accent: "from-yellow-100 via-amber-50 to-white",
  },
  {
    id: "msgroup",
    url: "http://msgroup.page.gd/",
    name: "MS Group",
    accent: "from-sky-100 via-blue-50 to-white",
  },
];
