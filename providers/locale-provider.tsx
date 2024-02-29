"use client"

import type { ReactNode } from 'react';
import { I18nProviderClient } from '../locales/client';

interface ProviderProps {
  locale: string;
  children: ReactNode;
};

export const LocaleProvider = ({ locale, children }: ProviderProps) => {
  return (
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  );
}