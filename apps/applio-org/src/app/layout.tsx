import type { Metadata } from "next";
import { Syne, Poppins } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ToastProvider } from "@/components/models/use-toast";
import GoogleAnalytics from "@/components/stats/google";

const inter = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https:/applio.org"),
	title: "Applio",
	description:
		"At the forefront of innovation as an open source ecosystem hosting cutting-edge AI audio technologies.",
	openGraph: {
		title: "Applio",
		description:
			"At the forefront of innovation as an open source ecosystem hosting cutting-edge AI audio technologies.",
		images: "/opengraph-image.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				<ToastProvider>
					<div className="min-h-screen max-md:mt-6">{children}</div>
				</ToastProvider>
				<Footer />
			</body>
			{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
				<GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
			) : null}
		</html>
	);
}
