import { useToast } from "@/lib/hooks/ui/use-toast";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useScopedI18n } from "@/locales/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { auth_route } from "@/lib/constants/routes/routes";

const supabase = createClient();

export function useLogout() {
	const qc = useQueryClient();
	const { audioAttributes } = useAudioStateQuery()
	const { toast } = useToast();
	const { push, refresh } = useRouter()

	const howl = audioAttributes.howl;

	const navbarLocale = useScopedI18n("main-service.main-part.config");

	const logoutMutation = useMutation({
		mutationFn: () => supabase.auth.signOut(),
		onSuccess: async () => {
			toast({
				title: navbarLocale("toast.log-out"),
				variant: "right"
			});
			
			push(auth_route);
			qc.clear();

			if (howl) howl.unload() // Unload and destroy a Howl object.

			return refresh();
		},
		onError: e => {throw new Error(e.message)}
	});

	return { logoutMutation }
}