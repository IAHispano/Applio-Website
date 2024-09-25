export default function LoadingIndicator() {
	return (
		<svg
			className="w-20 h-4 mt-4"
			viewBox="0 0 70 20"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<circle cx="15" cy="10" r="5" fill="currentColor">
				<animate
					attributeName="opacity"
					dur="1s"
					values="0;1;0"
					repeatCount="indefinite"
					begin="0.1"
				/>
			</circle>
			<circle cx="35" cy="10" r="5" fill="currentColor">
				<animate
					attributeName="opacity"
					dur="1s"
					values="0;1;0"
					repeatCount="indefinite"
					begin="0.2"
				/>
			</circle>
			<circle cx="55" cy="10" r="5" fill="currentColor">
				<animate
					attributeName="opacity"
					dur="1s"
					values="0;1;0"
					repeatCount="indefinite"
					begin="0.3"
				/>
			</circle>
		</svg>
	);
}
