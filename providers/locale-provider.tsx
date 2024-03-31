"use client"

import { I18nProviderClient } from '../locales/client';
import React from "react";

export const LocaleProvider = ({ 
  locale, 
  children 
}: {
  locale: string,
  children: React.ReactNode
}) => {
  return (
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  );
}