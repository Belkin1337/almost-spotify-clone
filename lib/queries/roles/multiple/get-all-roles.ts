import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { RoleType } from "@/types/role";

export async function getAllRoles(
	client: SupabaseClient
): Promise<PostgrestSingleResponse<RoleType[]>> {
	return client
		.from("roles")
		.select("*")
}