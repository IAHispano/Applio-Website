import { redirect } from "next/navigation";
import UpdatePassword from "@/components/login/update-password";
import { supabase } from "@/utils/database";

export default async function updatepassword() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		redirect("/");
	}

	return (
		<section>
			<UpdatePassword />
		</section>
	);
}
