export default function Footer() {
	return (
		<footer
			id="footer"
			className="relative pt-3 bg-gradient-to-b from-transparent to-white/[0.05] mt-52 z-[1]"
		>
			<div className="m-auto grid min-h-64 max-w-[100rem] relative grid-cols-2 gap-6 p-8 pb-20 pt-10 sm:grid-cols-2 lg:grid-cols-7 z-[1]">
				<div className="col-span-2 gap-4 flex flex-col">
					<h2 className="text-3xl font-bold truncate tracking-tight gtransition">
						Applio
					</h2>
					<p className="text-base max-w-md tracking-wide text-neutral-400">
						Dive into a world of endless possibilities fueled by advanced AI
						audio technology.
					</p>
					<div className="flex gap-4">
						<a
							href="https://www.linkedin.com/company/ai-hispano/"
							target="_blank"
							rel="noreferrer"
						>
							<svg
								width="21"
								height="21"
								viewBox="0 0 21 21"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-label="LinkedIn"
								role="img"

							>
								<path
									d="M19.4455 0H1.55039C0.693164 0 0 0.676758 0 1.51348V19.4824C0 20.3191 0.693164 21 1.55039 21H19.4455C20.3027 21 21 20.3191 21 19.4865V1.51348C21 0.676758 20.3027 0 19.4455 0ZM6.23027 17.8951H3.11309V7.8709H6.23027V17.8951ZM4.67168 6.50508C3.6709 6.50508 2.86289 5.69707 2.86289 4.70039C2.86289 3.70371 3.6709 2.8957 4.67168 2.8957C5.66836 2.8957 6.47637 3.70371 6.47637 4.70039C6.47637 5.69297 5.66836 6.50508 4.67168 6.50508ZM17.8951 17.8951H14.782V13.0225C14.782 11.8617 14.7615 10.3646 13.1619 10.3646C11.5418 10.3646 11.2957 11.632 11.2957 12.9404V17.8951H8.18672V7.8709H11.1727V9.24082H11.2137C11.6279 8.45332 12.6451 7.6207 14.1586 7.6207C17.3127 7.6207 17.8951 9.69609 17.8951 12.3949V17.8951Z"
									className="fill-white hover:fill-gray-300"
								/>
							</svg>
						</a>
						<a
							href="https://www.youtube.com/@IAHispano"
							target="_blank"
							rel="noreferrer"
						>
							<svg
								width="31"
								height="21"
								viewBox="0 0 31 21"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-label="YouTube"
								role="img"
							>
								<path
									d="M29.808 4.53124C29.808 4.53124 29.5166 2.47265 28.619 1.56873C27.4824 0.379061 26.2118 0.373229 25.629 0.303249C21.4557 -1.64697e-07 15.1901 0 15.1901 0H15.1784C15.1784 0 8.91273 -1.64697e-07 4.7395 0.303249C4.15665 0.373229 2.88602 0.379061 1.74946 1.56873C0.851866 2.47265 0.566267 4.53124 0.566267 4.53124C0.566267 4.53124 0.263184 6.9514 0.263184 9.36573V11.6284C0.263184 14.0428 0.560439 16.4629 0.560439 16.4629C0.560439 16.4629 0.851866 18.5215 1.74363 19.4254C2.8802 20.6151 4.3723 20.5743 5.03676 20.7026C7.42646 20.93 15.1842 21 15.1842 21C15.1842 21 21.4557 20.9883 25.629 20.6909C26.2118 20.6209 27.4824 20.6151 28.619 19.4254C29.5166 18.5215 29.808 16.4629 29.808 16.4629C29.808 16.4629 30.1053 14.0486 30.1053 11.6284V9.36573C30.1053 6.9514 29.808 4.53124 29.808 4.53124ZM12.1009 14.3752V5.98334L20.1618 10.1938L12.1009 14.3752Z"
									className="fill-white hover:fill-gray-300"
								/>
							</svg>
						</a>
						<a
							href="https://discord.gg/ai-hispano-1096877223765606521"
							target="_blank"
							rel="noreferrer"
						>
							<svg
								width="28"
								height="21"
								viewBox="0 0 28 21"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-label="Discord"
								role="img"
							>
								<path
									d="M23.76 1.74079C21.9988 0.935051 20.1102 0.341422 18.1356 0.00142624C18.0997 -0.00513558 18.0638 0.0112628 18.0452 0.0440602C17.8023 0.474793 17.5333 1.03672 17.3449 1.47839C15.2211 1.16136 13.1082 1.16136 11.0279 1.47839C10.8395 1.0269 10.5607 0.474793 10.3167 0.0440602C10.2982 0.012357 10.2622 -0.0040413 10.2263 0.00142624C8.25276 0.340336 6.3642 0.933965 4.60197 1.74079C4.58671 1.74734 4.57363 1.75829 4.56496 1.77249C0.982755 7.10863 0.0014399 12.3136 0.48284 17.4541C0.485018 17.4792 0.499177 17.5033 0.518782 17.5186C2.88222 19.2492 5.1716 20.2998 7.41848 20.9962C7.45444 21.0071 7.49254 20.994 7.51542 20.9645C8.04692 20.2408 8.52071 19.4777 8.92693 18.6752C8.9509 18.6282 8.92802 18.5725 8.87902 18.5539C8.12752 18.2696 7.41194 17.9231 6.7236 17.5295C6.66916 17.4978 6.6648 17.4202 6.71489 17.383C6.85974 17.2748 7.00463 17.1621 7.14294 17.0484C7.16797 17.0277 7.20284 17.0233 7.23226 17.0364C11.7543 19.095 16.65 19.095 21.1188 17.0364C21.1482 17.0222 21.1831 17.0266 21.2092 17.0474C21.3475 17.1611 21.4924 17.2748 21.6383 17.383C21.6884 17.4202 21.6851 17.4978 21.6307 17.5295C20.9423 17.9307 20.2268 18.2696 19.4742 18.5528C19.4252 18.5714 19.4034 18.6282 19.4274 18.6752C19.8423 19.4766 20.3161 20.2396 20.8378 20.9634C20.8596 20.994 20.8988 21.0071 20.9347 20.9962C23.1925 20.2998 25.4819 19.2492 27.8453 17.5186C27.866 17.5033 27.8791 17.4803 27.8813 17.4552C28.4574 11.5122 26.9163 6.34993 23.7959 1.77357C23.7882 1.75829 23.7752 1.74734 23.76 1.74079ZM9.60223 14.3241C8.24077 14.3241 7.11897 13.0778 7.11897 11.5472C7.11897 10.0167 8.21902 8.77039 9.60223 8.77039C10.9963 8.77039 12.1072 10.0276 12.0855 11.5472C12.0855 13.0778 10.9854 14.3241 9.60223 14.3241ZM18.7837 14.3241C17.4222 14.3241 16.3004 13.0778 16.3004 11.5472C16.3004 10.0167 17.4004 8.77039 18.7837 8.77039C20.1778 8.77039 21.2887 10.0276 21.2669 11.5472C21.2669 13.0778 20.1778 14.3241 18.7837 14.3241Z"
									className="fill-white hover:fill-gray-300"
								/>
							</svg>
						</a>
					</div>
					<p className="text-md mt-4">
						Copyright © {new Date().getFullYear()} Applio. All Rights Reserved.
					</p>
				</div>
				<div className="col-span-1 flex flex-col space-y-2">
					<h1 className="mb-1 text-xs font-bold uppercase">Products</h1>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="/products/bot"
						target="_blank"
						rel="noreferrer"
					>
						Discord Bot
					</a>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="/guides"
						target="_blank"
						rel="noreferrer"
					>
						Guides
					</a>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="/products/playground"
						target="_blank"
						rel="noreferrer"
					>
						Playground
					</a>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="/models"
						target="_blank"
						rel="noreferrer"
					>
						Explore
					</a>
				</div>
				<div className="col-span-1 flex flex-col space-y-2">
					<h1 className="mb-1 text-xs font-bold uppercase">Resources</h1>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="https://docs.applio.org/faq/"
						target="_blank"
						rel="noreferrer"
					>
						FAQs
					</a>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="https://discord.gg/ai-hispano-1096877223765606521"
						target="_blank"
						rel="noreferrer"
					>
						Support
					</a>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="https://docs.applio.org"
						target="_blank"
						rel="noreferrer"
					>
						Docs
					</a>
				</div>
				<div className="col-span-1 flex flex-col space-y-2">
					<h1 className="mb-1 text-xs font-bold uppercase">Legal</h1>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="/legal/terms-service"
						rel="noreferrer"
						target="_blank"
					>
						Terms of Service
					</a>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="/legal/terms-use"
						rel="noreferrer"
						target="_blank"
					>
						Terms of Use
					</a>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="/legal/privacy"
						rel="noreferrer"
						target="_blank"
					>
						Privacy Policy
					</a>
				</div>
				<div className="col-span-1 flex flex-col space-y-2">
					<h1 className="mb-1 text-xs font-bold uppercase">About Us</h1>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="/about/branding"
					>
						Brand
					</a>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="/about/team"
						target="_blank"
						rel="noreferrer"
					>
						Team
					</a>
					<a
						className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
						href="https://discord.gg/ai-hispano-1096877223765606521"
						target="_blank"
						rel="noreferrer"
					>
						Contact Us
					</a>
				</div>
			</div>
		</footer>
	);
}
