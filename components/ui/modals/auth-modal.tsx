"use client"

import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";

import { Modal } from "@/components/ui/modals/modal";

import { useEffect } from "react"
import { useRouter } from "next/navigation";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useAuthModal } from "@/hooks/use-auth-modal";

export const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter()

  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Modal title="Вход в аккаунт" description="" isOpen={isOpen} onChange={onChange}>
      <Auth theme="dark" supabaseClient={supabaseClient}
        providers={[]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: { brand: '#0DCECD', brandAccent: '#0DCECD', }
            }
          }
        }}
      />
    </Modal>
  );
}