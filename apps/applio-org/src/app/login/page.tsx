import AuthUI from "@/components/login/authUI";
import { supabase } from "@/utils/database";

export default async function Login() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return (
		<main>
			<AuthUI />
		</main>
	);
}
