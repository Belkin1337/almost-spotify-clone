"use client"

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/use-user";
import { useAuthModal } from "@/hooks/use-auth-modal";

import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { FaUserAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useScopedI18n } from "@/locales/client";

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const navbarLocale = useScopedI18n('main-service.main-part.config')

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else {
      toast.success(navbarLocale('toast.log-out'), {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-violet-500/10 to-transparent rounded-sm p-6`)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button onClick={() => router.back()} className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition">
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button onClick={() => router.forward()} className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition">
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white text-black px-6 py-2">{navbarLocale('log-out')}</Button>
              <Button onClick={() => router.push('/home/account')} className="bg-white">
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <Button onClick={authModal.onOpen} className="bg-transparent text-neutral-300 font-medium">{navbarLocale('sign-up')}</Button>
              <Button onClick={authModal.onOpen} className="bg-white px-6 py-2 text-black font-medium">{navbarLocale('log-in')}</Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}