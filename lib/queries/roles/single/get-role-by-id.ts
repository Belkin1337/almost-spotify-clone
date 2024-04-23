import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { RoleType } from "@/types/role";

export async function getRoleById(
	client: SupabaseClient,
	roleId: string
): Promise<PostgrestSingleResponse<RoleType>> {
	return client
		.from("roles")
		.select("*")
		.eq("id", roleId)
		.single()
}