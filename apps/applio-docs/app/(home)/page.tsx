import { redirect } from "next/navigation";

export default function Home() {
	redirect("/applio");

	return <></>;
}

export function generateMetadata() {
	return {
		title: "Applio Documentation",
		description:
			"Documentation of the world’s most widely used advanced AI audio technology tool.",
		image: "/banner.png",
		openGraph: {
			title: "Applio Documentation",
			description:
				"Documentation of the world’s most widely used advanced AI audio technology tool.",
			images: ["https://docs.applio.org/banner.png"],
			url: "https://docs.applio.org/applio",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: "Applio Documentation",
			description:
				"Documentation of the world’s most widely used advanced AI audio technology tool.",
			image: "https://docs.applio.org/banner.png",
		},
	};
}
