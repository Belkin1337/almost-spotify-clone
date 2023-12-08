"use client"

import { useState, useEffect } from "react";
import { AuthModal } from "@/components/ui/modals/auth-modal";
import { UploadModal } from "@/components/ui/modals/upload-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
}