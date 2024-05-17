function Badge({ text }: { text: string }) {
	return (
		<div>
			<div className="px-6 py-1 text-xs rounded-md dark:bg-white/10 bg-black/10 font-medium">
				{text}
			</div>
		</div>
	);
}

export default Badge;
