"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "./toast";

type ToastContextType = {
	showToast: (message: string, type?: "success" | "error" | "warning") => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast debe ser usado dentro de ToastProvider");
	}
	return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [toasts, setToasts] = useState<
		{ id: number; message: string; type?: "success" | "error" | "warning" }[]
	>([]);

	const showToast = (
		message: string,
		type?: "success" | "error" | "warning",
	) => {
		const id = Date.now();
		setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

		setTimeout(() => {
			setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
		}, 3000);
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div className="fixed bottom-5 md:right-5 max-md:left-8 max-md:right-8 flex flex-col gap-4 z-50">
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						message={toast.message}
						type={toast.type}
						onClose={() => {
							setToasts((prevToasts) =>
								prevToasts.filter((t) => t.id !== toast.id),
							);
						}}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
};
