'use client'

import { ReactNode } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { IntlProvider } from "react-intl";
import { EnToBnLanguage } from "@/utils/EnToBnLanguage";

export default function IntlAndContextWrapper({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LanguageWrapper>{children}</LanguageWrapper>
    </LanguageProvider>
  );
}

function LanguageWrapper({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const messages = EnToBnLanguage[lang] || EnToBnLanguage["en"];

  return (
    <IntlProvider messages={messages} locale={lang} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}
