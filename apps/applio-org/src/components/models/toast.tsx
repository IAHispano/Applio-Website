"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type ToastProps = {
	message: string;
	type?: "success" | "error" | "warning";
	duration?: number;
	onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({
	message,
	type,
	duration = 3000,
	onClose,
}) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => {
			clearTimeout(timer);
		};
	}, [duration, onClose]);

	return (
		<AnimatePresence>
			<motion.div
				key="modal"
				initial={{ opacity: 0, filter: "blur(80px)" }}
				animate={{ opacity: 1, filter: "blur(0px)" }}
				transition={{ duration: 0.4 }}
				exit={{ opacity: 0, filter: "blur(80px)" }}
				className={`bottom-5 right-5 px-4 py-2 rounded-xl shadow-lg z-50 border text-neutral-300 border-white/10 backdrop-filter backdrop-blur-3xl ${type === "success" ? "bg-green-500/40" : type === "error" ? "bg-red-500/40" : type === "warning" ? "bg-yellow-500/40" : "bg-neutral-800"}`}
			>
				{message}
			</motion.div>
		</AnimatePresence>
	);
};

export default Toast;
