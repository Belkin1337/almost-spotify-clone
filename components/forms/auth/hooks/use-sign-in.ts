import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { zodSignInSchema } from "@/components/forms/auth/components/sign-in-form";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

const supabase = createClient();

export function useSignIn() {
	const [ error, setError ] = useState<string>('');
	const { closeDialog } = useDialog();
	const { refresh } = useRouter();
	
	const signInMutation = useMutation({
		mutationFn: async(values: zodSignInSchema) => {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password,
			})
			
			if (error) return error;
			
			if (data && !error) return data
		},
		onSuccess: async(data) => {
			if (!data) return;
			
			if ('user' in data) {
				closeDialog();
				refresh();
			} else {
				setError(data.toString());
			}
		},
		onError: e => {throw new Error(e.message);}
	})
	
	return { signInMutation, error }
}