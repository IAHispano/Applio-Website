import { redirect } from "next/navigation";
import ResetPassword from "@/components/login/reset-password";
import { supabase } from "@/utils/database";

export default async function password() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		redirect("/");
	}

	return (
		<section>
			<ResetPassword />
		</section>
	);
}
