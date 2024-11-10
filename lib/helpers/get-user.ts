"use server";

import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { redirect } from "next/navigation";

type GetUser = {
	withValidation?: boolean;
};

export async function getUser(properties: GetUser = { withValidation: true }) {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();
	
	const withValidation = properties.withValidation ?? true;

	if (!user && withValidation) {
		return redirect("/");
	}
	
	return user;
}