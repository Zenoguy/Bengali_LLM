import { useState, useCallback } from 'react';
import bn from '../locales/bn.json';
import en from '../locales/en.json';

export type Lang = 'bn' | 'en';

const translations: Record<Lang, Record<string, string>> = { bn, en };

const fontClass: Record<Lang, string> = {
  bn: 'lang-bn',
  en: '',
};

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('bengali-llm-lang') as Lang | null;
    return saved && ['bn', 'en'].includes(saved) ? saved : 'bn';
  });

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem('bengali-llm-lang', l);
    setLangState(l);
    document.documentElement.className = fontClass[l];
  }, []);

  const t = useCallback(
    (key: string): string => translations[lang][key] ?? key,
    [lang],
  );

  return { lang, setLang, t };
}
