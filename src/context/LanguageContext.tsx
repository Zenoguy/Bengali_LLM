import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import bn from '../locales/bn.json';
import en from '../locales/en.json';

export type Lang = 'bn' | 'en';

const translations: Record<Lang, Record<string, string>> = { bn, en };

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangCtx>({
  lang: 'bn',
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bn');

  useEffect(() => {
    const saved = localStorage.getItem('bengali-llm-lang') as Lang | null;
    if (saved && ['bn', 'en'].includes(saved)) {
      setLangState(saved);
      document.documentElement.className = saved === 'bn' ? 'lang-bn' : '';
    } else {
      document.documentElement.className = 'lang-bn';
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem('bengali-llm-lang', l);
    setLangState(l);
    document.documentElement.className = l === 'bn' ? 'lang-bn' : '';
  }, []);

  const t = useCallback((key: string): string => translations[lang][key] ?? key, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
