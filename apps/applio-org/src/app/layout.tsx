import type { Metadata } from "next";
import { Syne, Poppins } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://v2.applio.org"),
	title: "Applio",
	description:
		"At the forefront of innovation as an open-source ecosystem that hosts cutting-edge AI voice cloning technologies.",
	openGraph: {
		title: "Applio",
		description:
			"At the forefront of innovation as an open-source ecosystem that hosts cutting-edge AI voice cloning technologies.",
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
				<div className="min-h-screen max-md:mt-6">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
