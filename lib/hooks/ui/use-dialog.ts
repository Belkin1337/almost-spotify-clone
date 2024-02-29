"use client"

import { DialogContext, DialogContextType } from "@/providers/dialog-provider";
import { useContext } from "react";

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return context;
};