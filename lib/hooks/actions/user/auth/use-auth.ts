"use client";

import { createClient } from "@/lib/utils/supabase/client";
import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { z } from "zod";

const supabase = createClient();

async function signIn(
  values: z.infer<any>
): Promise<AuthTokenResponsePassword> {
  return await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });
}

async function signUp(values: z.infer<any>) {
  return await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        first_name: values.first_name,
        last_name: values.last_name,
      },
    },
  });
}

async function logOut() {
  return await supabase.auth.signOut()
}

export const useSignIn = () => {
  return {
    signIn,
    signUp,
    logOut
  };
};
