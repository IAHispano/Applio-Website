import AuthUI from "@/components/login/authUI";
import { createClient } from "@/utils/server-database";
import { redirect } from "next/navigation";

// Remove for local development
export const runtime = "edge";

export default async function Login() {
	const supabase = createClient();
	const { data: session, error } = await supabase.auth.getSession();
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
