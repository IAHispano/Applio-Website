import AuthUI from "@/components/login/authUI";
import { createClient } from "@/utils/server-database";
import { redirect } from "next/navigation";

export default async function Login() {
	const supabase = createClient();
	const { data: session, error } = await supabase.auth.getSession();
	console.log(session);
	if (session.session) {
		redirect("/");
	}

	if (error) {
		console.error(error);
	}

	return (
		<main>
			<AuthUI />
		</main>
	);
}
