import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dict, type Dict, type Lang } from "../i18n";

interface LangCtx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx | null>(null);

const STORAGE_KEY = "firstform-lang";

function detectInitial(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "am") return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("am") ? "am" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.title =
      lang === "am"
        ? "ፈርስትፎርም — ለኢትዮጵያ ንግዶች ድረ-ገጾች | ነጻ ናሙና፣ በ3 ቀናት"
        : "Firstform — Websites for Ethiopian Businesses | Free Prototype, 3-Day Delivery";
  }, [lang]);

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      t: dict[lang],
      setLang: setLangState,
      toggle: () => setLangState((l) => (l === "en" ? "am" : "en")),
    }),
    [lang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
