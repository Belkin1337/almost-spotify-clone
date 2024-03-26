"use client"

import { createContext, useContext } from 'react';

interface SongWidgetContextType {
  isSongWidgetVisible: boolean;
  handleToggleSongWidget: () => void;
}

export const SongWidgetContext = createContext<SongWidgetContextType | undefined>(undefined);

export const useSongWidget = () => {
  const context = useContext(SongWidgetContext);

  if (!context) {
    throw new Error('useSongWidget must be used within a SongWidgetProvider');
  }
  
  return context;
};