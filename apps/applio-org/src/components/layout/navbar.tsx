"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import BlurIn from "../magicui/blur-text";
import Avatar from "./avatar";
import NavbarMobile from "./navbarMobile";

export default function Navbar() {
	const { scrollY } = useScroll();
	const [scrolled, setScrolled] = useState(false);
	const [isOpenProducts, setIsOpenProducts] = useState(false);
	const [isOpenAbout, setIsOpenAbout] = useState(false);
	let closeTimeout: NodeJS.Timeout;

	const handleMouseEnterProducts = () => {
		if (closeTimeout) clearTimeout(closeTimeout);
		setIsOpenProducts(true);
		setIsOpenAbout(false);
	};

	const handleMouseLeaveProducts = () => {
		closeTimeout = setTimeout(() => setIsOpenProducts(false), 200);
	};

	const handleMouseEnterAbout = () => {
		if (closeTimeout) clearTimeout(closeTimeout);
		setIsOpenAbout(true);
		setIsOpenProducts(false);
	};

	const handleMouseLeaveAbout = () => {
		closeTimeout = setTimeout(() => setIsOpenAbout(false), 200);
	};

	useEffect(() => {
		const unsubscribe = scrollY.onChange((latest) => {
			setScrolled(latest > 50);
		});
		return () => unsubscribe();
	}, [scrollY]);

	return (
		<motion.header
			className="fixed top-0 z-50 w-full"
			initial={{ borderBottom: "0px solid rgba(255, 255, 255, 0)" }}
			animate={{
				borderBottom: scrolled
					? "1px solid rgba(255, 255, 255, 0.2)"
					: "0px solid rgba(255, 255, 255, 0)",
			}}
			transition={{ duration: 0.3 }}
		>
			<div className="max-xl:hidden flex items- justify-center mx-auto h-16 bg-gradient-to-b from-[#110F0F] to-transparent backdrop-filter backdrop-blur-lg p-2 px-12">
				<div className="flex items-center justify-center mx-24">
					<a
						href="/"
						onContextMenu={(e) => {
							e.preventDefault();
							window.open("/about/branding", "_blank");
						}}
					>
						<BlurIn word="Applio" className="text-3xl font-bold" />
					</a>
					<div className="grid grid-cols-2 w-full items-center m-auto">
						<div className="flex mx-12 gap-8 pt-1">
							<a href="/models">
								<p className="text-neutral-300 hover:text-white slow">
									Explore
								</p>
							</a>
							<a href="/learn">
								<p className="text-neutral-300 hover:text-white slow">Learn</p>
							</a>
							<div
								className="dropdown"
								onMouseEnter={handleMouseEnterProducts}
								onMouseLeave={handleMouseLeaveProducts}
							>
								<a className="relative flex gap-2 items-center text-neutral-300 hover:text-white slow cursor-pointer">
									<p>Products</p>
									<svg
										aria-hidden="true"
										width="12"
										height="7"
										viewBox="0 0 12 7"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M10.3333 1L5.66667 5.66667L1 1"
											stroke="rgb(212 212 212)"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</a>
								{/* dropdown products */}
								<div
									className={`z-50 bg-[#1c1c1c]/90 dropdown-menu absolute mt-6 rounded-lg p-4 px-6 border border-white/20 backdrop-filter backdrop-blur-xl transition-opacity duration-300 ease-in-out ${
										isOpenProducts
											? "opacity-100 visible"
											: "opacity-0 invisible"
									}`}
								>
									<div className="flex gap-2">
										<div className="items-start flex flex-col text-left gap-2">
											<h2 className="text-xs p-2 font-bold uppercase">
												Voice cloning
											</h2>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="/products/applio"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 74 84"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M42.8798 19.9981C46.549 18.6324 50.188 17.9168 53.9501 18.0535C59.4299 18.1695 63.5654 20.7749 67.0116 24.8298C70.8918 29.3953 73.1314 34.7266 73.7827 40.7686C74.1578 44.2491 74.0252 47.7285 73.5541 51.2054C72.9134 55.934 71.8477 60.5357 69.9383 64.8843C68.2956 68.6256 66.5752 72.3524 63.9756 75.4931C60.7251 79.4202 56.8107 82.3757 51.9145 83.7018C50.2353 84.1566 48.5586 84.0909 46.9008 83.5064C44.405 82.6263 41.8707 81.8766 39.3444 81.0987C38.1702 80.7371 37.0239 80.7229 35.8505 81.0437C32.7807 81.8832 29.7271 82.8015 26.6311 83.5193C22.2964 84.5243 18.4074 83.5477 15.0482 80.393C9.85068 75.5117 6.20669 69.5367 3.54223 62.8578C1.85111 58.6187 0.598699 54.2341 0.194805 49.659C-0.477234 42.0463 0.505791 34.7195 4.45915 28.1078C6.62385 24.4875 9.41723 21.4567 13.125 19.4843C15.3759 18.287 17.8003 17.9532 20.2937 18.0218C24.5661 18.1394 28.7147 19.1191 32.8783 19.9946C33.1663 20.0551 33.4567 20.1046 33.7473 20.1504C33.7866 20.1566 33.8333 20.1112 33.9468 20.0547C33.6609 18.9417 33.1186 17.9362 32.5476 16.9642C31.1692 14.6177 29.6211 12.3918 27.9959 10.2238C27.502 9.56492 26.9058 9.26406 26.0888 9.2785C24.3628 9.30901 23.7028 8.31011 24.2427 6.57824C24.8044 4.77653 26.4037 4.17878 27.9274 5.19183C28.4331 5.52807 28.8505 5.95534 29.2331 6.43098C30.8867 8.48648 32.2606 10.7402 33.5424 13.0577C34.1993 14.2452 34.607 15.5403 34.9775 16.8495C35.072 17.1836 35.0982 17.5626 35.4415 17.826C35.898 17.4276 35.8147 16.8329 35.8633 16.3506C36.3456 11.5563 38.6176 7.8884 42.2134 4.9765C44.6828 2.97672 47.2488 1.19554 50.2795 0.260445C50.5619 0.173309 50.849 0.0965658 51.1386 0.0418279C52.2451 -0.167339 52.8889 0.417225 53.0255 1.58789C53.6648 7.06529 51.5023 11.381 47.9484 15.1451C46.5957 16.5778 45.1311 17.8688 43.5871 19.0673C43.3389 19.2601 43.0384 19.4117 42.8798 19.9981Z"
															fill="#EAEAEA"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">Applio</h3>
													<p className="text-xs text-neutral-200">
														AI voice cloning tool.
													</p>
												</div>
											</a>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="/products/app"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 243 268"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M39.0918 170.987L84.2114 77.7759V9H159.037V77.7759L203.995 170.987"
															stroke="white"
															strokeWidth="18"
															strokeLinejoin="round"
														/>
														<path
															d="M20.5071 256.173C15.6393 253.817 11.9068 249.624 10.1309 244.515C8.3549 239.407 8.68089 233.802 11.0371 228.935L39.092 170.987C39.092 170.987 84.0933 202.138 121.475 170.987C158.856 139.836 204.001 170.987 204.001 170.987L231.975 228.96C233.475 232.069 234.161 235.508 233.968 238.954C233.776 242.401 232.712 245.742 230.876 248.665C229.04 251.588 226.492 253.997 223.471 255.667C220.449 257.337 217.054 258.212 213.602 258.211H29.3915C26.3138 258.211 23.2796 257.513 20.5071 256.173Z"
															fill="white"
															stroke="white"
															strokeWidth="18"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">Desktop APP</h3>
													<p className="text-xs text-neutral-200">
														Upcoming desktop application.
													</p>
												</div>
											</a>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="/products/playground"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 235 235"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M189.306 117.5C184.112 117.5 179.131 115.437 175.458 111.764C171.785 108.092 169.722 103.11 169.722 97.9167C169.722 92.7228 171.785 87.7417 175.458 84.0692C179.131 80.3966 184.112 78.3333 189.306 78.3333C194.499 78.3333 199.48 80.3966 203.153 84.0692C206.826 87.7417 208.889 92.7228 208.889 97.9167C208.889 103.11 206.826 108.092 203.153 111.764C199.48 115.437 194.499 117.5 189.306 117.5ZM150.139 65.2778C144.945 65.2778 139.964 63.2145 136.291 59.542C132.619 55.8694 130.556 50.8883 130.556 45.6944C130.556 40.5006 132.619 35.5195 136.291 31.8469C139.964 28.1743 144.945 26.1111 150.139 26.1111C155.333 26.1111 160.314 28.1743 163.986 31.8469C167.659 35.5195 169.722 40.5006 169.722 45.6944C169.722 50.8883 167.659 55.8694 163.986 59.542C160.314 63.2145 155.333 65.2778 150.139 65.2778ZM84.8611 65.2778C79.6673 65.2778 74.6862 63.2145 71.0136 59.542C67.341 55.8694 65.2778 50.8883 65.2778 45.6944C65.2778 40.5006 67.341 35.5195 71.0136 31.8469C74.6862 28.1743 79.6673 26.1111 84.8611 26.1111C90.0549 26.1111 95.036 28.1743 98.7086 31.8469C102.381 35.5195 104.444 40.5006 104.444 45.6944C104.444 50.8883 102.381 55.8694 98.7086 59.542C95.036 63.2145 90.0549 65.2778 84.8611 65.2778ZM45.6944 117.5C40.5006 117.5 35.5195 115.437 31.8469 111.764C28.1743 108.092 26.1111 103.11 26.1111 97.9167C26.1111 92.7228 28.1743 87.7417 31.8469 84.0692C35.5195 80.3966 40.5006 78.3333 45.6944 78.3333C50.8883 78.3333 55.8694 80.3966 59.542 84.0692C63.2145 87.7417 65.2778 92.7228 65.2778 97.9167C65.2778 103.11 63.2145 108.092 59.542 111.764C55.8694 115.437 50.8883 117.5 45.6944 117.5ZM117.5 0C86.3371 0 56.4505 12.3794 34.415 34.415C12.3794 56.4505 0 86.3371 0 117.5C0 148.663 12.3794 178.55 34.415 200.585C56.4505 222.621 86.3371 235 117.5 235C122.694 235 127.675 232.937 131.348 229.264C135.02 225.592 137.083 220.61 137.083 215.417C137.083 210.325 135.125 205.756 131.992 202.361C128.989 198.836 127.031 194.267 127.031 189.306C127.031 184.112 129.094 179.131 132.766 175.458C136.439 171.785 141.42 169.722 146.614 169.722H169.722C187.035 169.722 203.639 162.845 215.881 150.603C228.123 138.361 235 121.757 235 104.444C235 46.7389 182.386 0 117.5 0Z"
															fill="white"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">Playground</h3>
													<p className="text-xs text-neutral-200">
														Experiment with Applio.
													</p>
												</div>
											</a>
										</div>
										<div className="items-start flex flex-col text-left gap-2">
											<h2 className="text-xs p-2 font-bold uppercase">
												Our ecosystem
											</h2>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="https://docs.applio.org"
												target="_blank"
												rel="noreferrer"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-10 h-10"
														viewBox="0 0 512 512"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M359.523 197.054C364.159 192.418 364.159 184.691 359.523 180.293L331.707 152.477C327.309 147.841 319.582 147.841 314.946 152.477L293.073 174.231L337.65 218.808M149 318.423V363H193.577L325.05 231.408L280.473 186.831L149 318.423Z"
															fill="white"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">
														Documentation
													</h3>
													<p className="text-xs text-neutral-200">
														Guide to using Applio.
													</p>
												</div>
											</a>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="/products/bot"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 245 244"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M232.718 108.968V72.5313C232.718 66.0346 230.137 59.8041 225.543 55.2103C220.949 50.6165 214.718 48.0357 208.221 48.0357H134.731V31.9667C138.467 28.6108 140.855 23.7852 140.855 18.3716C140.855 13.4992 138.92 8.82628 135.474 5.38093C132.029 1.93558 127.356 0 122.483 0C117.61 0 112.937 1.93558 109.492 5.38093C106.046 8.82628 104.11 13.4992 104.11 18.3716C104.11 23.7852 106.499 28.6108 110.235 31.9667V48.0357H36.7449C30.248 48.0357 24.0172 50.6165 19.4232 55.2103C14.8292 59.8041 12.2483 66.0346 12.2483 72.5313V109.25L11.3664 109.311C8.27847 109.531 5.3887 110.914 3.27948 113.18C1.17025 115.445 -0.00162895 118.427 1.69948e-06 121.522V146.018C1.69948e-06 149.266 1.29044 152.381 3.58744 154.678C5.88444 156.975 8.99984 158.266 12.2483 158.266V219.504C12.2483 226.001 14.8292 232.232 19.4232 236.825C24.0172 241.419 30.248 244 36.7449 244H208.221C214.718 244 220.949 241.419 225.543 236.825C230.137 232.232 232.718 226.001 232.718 219.504V158.266C235.966 158.266 239.081 156.975 241.378 154.678C243.675 152.381 244.966 149.266 244.966 146.018V122.282C245.108 120.381 244.806 118.473 244.084 116.709C241.61 110.732 236.306 109.299 232.718 108.968ZM61.2415 121.522C61.2415 108.001 69.4723 97.0268 79.6139 97.0268C89.7555 97.0268 97.9863 108.001 97.9863 121.522C97.9863 135.044 89.7555 146.018 79.6139 146.018C69.4723 146.018 61.2415 135.044 61.2415 121.522ZM171.452 195.009C159.191 194.972 73.4898 195.009 73.4898 195.009V170.513C73.4898 170.513 159.24 170.489 171.501 170.513L171.452 195.009ZM165.352 146.018C155.21 146.018 146.98 135.044 146.98 121.522C146.98 108.001 155.21 97.0268 165.352 97.0268C175.494 97.0268 183.724 108.001 183.724 121.522C183.724 135.044 175.494 146.018 165.352 146.018Z"
															fill="white"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">Discord Bot</h3>
													<p className="text-xs text-neutral-200">
														All-in-one bot for Discord.
													</p>
												</div>
											</a>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="https://github.com/iahispano/Applio-Plugins"
												target="_blank"
												rel="noreferrer"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 242 231"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M79.7017 69.7391L9.43257 79.9172L8.18799 80.1703C6.30393 80.67 4.58636 81.6603 3.21069 83.04C1.83501 84.4197 0.850518 86.1395 0.357738 88.0237C-0.135042 89.9079 -0.118449 91.889 0.405819 93.7647C0.930088 95.6404 1.94325 97.3434 3.34184 98.7L54.2484 148.204L42.2432 218.131L42.1 219.341C41.9847 221.288 42.3893 223.23 43.2725 224.969C44.1556 226.709 45.4855 228.182 47.1261 229.239C48.7666 230.296 50.6588 230.898 52.609 230.984C54.5591 231.07 56.4971 230.637 58.2245 229.728L121.07 196.718L183.773 229.728L184.874 230.234C186.692 230.95 188.668 231.169 190.599 230.87C192.53 230.571 194.346 229.764 195.862 228.532C197.377 227.3 198.538 225.687 199.224 223.859C199.91 222.032 200.096 220.054 199.765 218.131L187.749 148.204L238.677 98.689L239.536 97.7537C240.764 96.2437 241.568 94.4357 241.868 92.5138C242.168 90.592 241.953 88.6251 241.245 86.8134C240.536 85.0017 239.359 83.41 237.835 82.2006C236.31 80.9911 234.492 80.207 232.565 79.9282L162.296 69.7391L130.884 6.13955C129.975 4.29686 128.568 2.74517 126.822 1.66012C125.076 0.575074 123.06 0 121.004 0C118.948 0 116.933 0.575074 115.187 1.66012C113.441 2.74517 112.034 4.29686 111.125 6.13955L79.7017 69.7391Z"
															fill="white"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">Marketplace</h3>
													<p className="text-xs text-neutral-200">
														Collection of plugins.
													</p>
												</div>
											</a>
										</div>
										<div className="items-start flex flex-col text-left gap-2">
											<h2 className="text-xs p-2 font-bold uppercase">
												For developers
											</h2>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="/products/api"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 226 226"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M216.96 0H9.04C4.03975 0 0 4.03975 0 9.04V216.96C0 221.96 4.03975 226 9.04 226H216.96C221.96 226 226 221.96 226 216.96V9.04C226 4.03975 221.96 0 216.96 0ZM113.311 114.723L59.0708 160.206C57.6017 161.449 55.37 160.404 55.37 158.482V140.77C55.37 140.12 55.6807 139.47 56.1892 139.047L87.2078 113L56.1892 86.9535C55.9296 86.7484 55.7206 86.4863 55.5786 86.1875C55.4365 85.8886 55.3651 85.5611 55.37 85.2303V67.5175C55.37 65.5965 57.6017 64.5513 59.0708 65.7943L113.311 111.248C114.412 112.152 114.412 113.819 113.311 114.723ZM170.63 158.482C170.63 159.725 169.669 160.742 168.511 160.742H116.249C115.09 160.742 114.13 159.725 114.13 158.482V144.923C114.13 143.68 115.09 142.663 116.249 142.663H168.511C169.669 142.663 170.63 143.68 170.63 144.923V158.482Z"
															fill="white"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">Free API</h3>
													<p className="text-xs text-neutral-200">
														Fast API with 20k+ models.
													</p>
												</div>
											</a>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="https://github.com/blaisewf/rvc-cli"
												target="_blank"
												rel="noreferrer"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 198 240"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M0 240V166.701C0 162.577 0.981749 158.66 2.94525 154.948C4.90875 151.237 7.6395 148.247 11.1375 145.979L24.75 137.01C26.1937 154.33 28.4625 169.072 31.5562 181.237C34.65 193.402 39.4969 206.907 46.0969 221.753L0 240ZM64.6594 215.258C57.4406 201.649 52.0781 187.216 48.5719 171.959C45.0656 156.701 43.3125 140.928 43.3125 124.639C43.3125 98.866 48.4192 74.5897 58.6327 51.8103C68.8462 29.0309 82.302 11.7608 99 0C115.706 11.7526 129.166 29.0227 139.38 51.8103C149.593 74.5979 154.696 98.8742 154.687 124.639C154.687 140.722 152.934 156.342 149.428 171.501C145.922 186.66 140.559 201.245 133.341 215.258H64.6594ZM99 128.66C105.806 128.66 111.635 126.239 116.486 121.398C121.337 116.557 123.758 110.73 123.75 103.918C123.742 97.1051 121.32 91.2825 116.486 86.4495C111.651 81.6165 105.823 79.1917 99 79.1753C92.1772 79.1588 86.3527 81.5835 81.5265 86.4495C76.7002 91.3155 74.2747 97.1381 74.25 103.918C74.2252 110.697 76.6507 116.524 81.5265 121.398C86.4022 126.272 92.2267 128.693 99 128.66ZM198 240L151.903 221.753C158.503 206.907 163.35 193.402 166.444 181.237C169.537 169.072 171.806 154.33 173.25 137.01L186.862 145.979C190.369 148.247 193.104 151.237 195.067 154.948C197.031 158.66 198.008 162.577 198 166.701V240Z"
															fill="white"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">CLI</h3>
													<p className="text-xs text-neutral-200">
														Command-line interface for RVC.
													</p>
												</div>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div
								className="dropdown"
								onMouseEnter={handleMouseEnterAbout}
								onMouseLeave={handleMouseLeaveAbout}
							>
								<a className="relative flex gap-2 items-center text-neutral-300 hover:text-white slow cursor-pointer">
									<p>About Us</p>
									<svg
										aria-hidden="true"
										width="12"
										height="7"
										viewBox="0 0 12 7"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M10.3333 1L5.66667 5.66667L1 1"
											stroke="rgb(212 212 212)"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</a>
								{/* dropdown about us */}
								<div
									className={`z-50 bg-[#1c1c1c]/90  dropdown-menu absolute mt-6 rounded-lg p-4 px-6 border border-white/20 backdrop-filter backdrop-blur-xl transition-opacity duration-300 ease-in-out ${
										isOpenAbout ? "opacity-100 visible" : "opacity-0 invisible"
									}`}
								>
									<div className="flex gap-2">
										<div className="items-start flex flex-col text-left gap-2">
											<h2 className="text-xs p-2 font-bold uppercase">Team</h2>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="/about/team"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 236 263"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M26.3548 263C9.01463 263 2.05229 231.94 0.607281 219.568C-0.948376 207.557 0.496033 195.347 4.81095 184.033C6.70741 178.649 9.96943 173.853 14.2764 170.114C18.5834 166.376 23.7871 163.825 29.3762 162.712C44.7458 160.08 55.6491 169.292 69.5738 172.451C72.1895 173.292 74.9781 173.44 77.6677 172.879C80.3572 172.319 82.8559 171.07 84.9201 169.254C86.9842 167.438 88.5433 165.116 89.4453 162.517C90.3473 159.917 90.5614 157.128 90.0667 154.42C84.2866 131.783 43.1695 131.388 26.3548 131.388C26.3548 106.908 53.1532 103.75 72.3324 105.592C83.7104 106.693 94.9139 109.168 105.699 112.963C112.267 115.2 119.886 120.859 127.112 120.333C138.015 119.412 140.248 108.093 135.519 99.8014C124.09 80.3229 91.6431 78.7435 72.3324 78.7435C72.3324 52.4212 95.0586 47.4199 116.865 51.3683C128.124 53.5891 139.097 57.077 149.575 61.7656C156.275 64.6611 164.288 70.1888 171.644 67.6881C190.561 61.8972 170.856 41.629 162.449 36.7594C156.548 33.4972 150.288 30.9354 143.795 29.1259C136.701 27.0201 128.031 27.8098 134.468 19.5182C144.533 10.6215 157.021 4.93874 170.331 3.19839C195.159 -2.59253 229.445 -3.64543 235.488 27.6782C237.501 44.2158 233.54 60.9294 224.322 74.7952C199.843 116.731 169.545 154.973 134.337 188.376C115.685 207.532 95.4724 225.097 73.9088 240.889C60.7723 250.365 43.4322 263 26.3548 263Z"
															fill="white"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">Our Team</h3>
													<p className="text-xs text-neutral-200">
														Meet the people behind Applio.
													</p>
												</div>
											</a>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="/about/mission"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 264 242"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M132 242L112.86 224.592C44.88 163.004 0 122.253 0 72.5341C0 31.7831 31.944 0 72.6 0C95.568 0 117.612 10.6823 132 27.4311C146.388 10.6823 168.432 0 191.4 0C232.056 0 264 31.7831 264 72.5341C264 122.253 219.12 163.004 151.14 224.592L132 242Z"
															fill="white"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">Our Mission</h3>
													<p className="text-xs text-neutral-200">
														What drives us at Applio.
													</p>
												</div>
											</a>
											<a
												className="flex gap-2 cursor-pointer hover:bg-white/20 rounded-md w-full p-2 slow h-18"
												href="https://discord.gg/iahispano"
												target="_blank"
												rel="noreferrer"
											>
												<div className="flex border border-white/20 rounded-md justify-center items-center w-12 h-12">
													<svg
														aria-hidden="true"
														className="w-5 h-5"
														viewBox="0 0 202 242"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M202 232.925C202 235.332 201.046 237.64 199.349 239.342C197.652 241.044 195.35 242 192.95 242H9.05018C6.64992 242 4.34797 241.044 2.65073 239.342C0.953497 237.64 0 235.332 0 232.925C0 183.315 54.3011 144.837 101 144.837C147.699 144.837 202 183.315 202 232.925ZM162.541 61.831C162.517 74.0309 158.888 85.95 152.111 96.0822C145.334 106.214 135.715 114.105 124.467 118.757C113.22 123.409 100.85 124.614 88.9201 122.219C76.9902 119.825 66.0359 113.938 57.4413 105.303C48.8467 96.6677 42.9974 85.6718 40.6326 73.7046C38.2678 61.7373 39.4935 49.3357 44.155 38.0667C48.8164 26.7978 56.7043 17.1671 66.8221 10.3917C76.9399 3.61622 88.8334 2.34524e-05 101 0C117.333 0.0320502 132.986 6.56052 144.524 18.1526C156.061 29.7447 162.541 45.4533 162.541 61.831Z"
															fill="white"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<h3 className="text-lg font-semibold">Contact Us</h3>
													<p className="text-xs text-neutral-200">
														Get in touch with us.
													</p>
												</div>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Avatar />
					</div>
				</div>
			</div>
			<div className="xl:hidden overflow-hidden no-scroll">
				<NavbarMobile />
			</div>
		</motion.header>
	);
}
