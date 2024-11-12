import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { zodSignUpSchema } from "@/components/forms/auth/components/sign-up-form";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

const supabase = createClient();

export function useSignUp() {
	const [ error, setError ] = useState<string>('')
	const { closeDialog } = useDialog();
	const { refresh } = useRouter()
	
	const signUpMutation = useMutation({
		mutationFn: async(values: zodSignUpSchema) => {
			const { data, error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
				options: {
					data: { full_name: values.full_name },
				},
			});
			
			if (error) return error;
			
			if (data && !error) return data;
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
	
	return { signUpMutation, error }
}