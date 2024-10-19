export default function ModelCard({
	data,
}: {
	data: {
		name: string;
		description: string;
		author_username: string;
		server_name: string;
		tags: string;
		created_at: string;
		id: string;
	};
}) {
	return (
		<div className="p-4 bg-neutral-800 hover:bg-neutral-700/40 slow rounded-xl w-[100svh] border border-white/10">
			<div className="md:justify-between flex max-md:flex-col">
				<div>
					<h1 className="text-xl max-w-5xl max-md:text-wrap truncate text-left font-semibold">
						{data.name}
					</h1>
					<h2 className="text-white/80 text-sm text-left">
						by @{data.author_username} in {data.server_name}
					</h2>
					<p className="text-white/80 text-sm mt-2 text-left italic">
						{data.description}
					</p>
				</div>
			</div>
			<div className="md:justify-between max-md:flex md:items-center max-md:flex-col flex md:mt-4 mt-2 gap-8">
				<div className="flex max-md:flex-col gap-2 md:w-[60%]">
					{data.tags && (
						<>
							{data.tags.split(",").map((tag, index) => (
								<div
									key={tag}
									className="border border-white/10 rounded-xl py-1 w-full text-center text-sm md:px-4"
								>
									<p className="" key={tag}>
										{tag}
									</p>
								</div>
							))}
						</>
					)}
				</div>
				<div>
					<p className="text-white/70 max-md:mt-4 max-md:text-right">
						published {(() => {
							const t = Math.round(
								(new Date().getTime() - new Date(data.created_at).getTime()) /
									(1000 * 60),
							);
							return t < 60
								? `${t} minutes`
								: t < 1440
									? `${Math.floor(t / 60)}h`
									: Math.floor(t / 1440) === 1
										? `1 day`
										: `${Math.floor(t / 1440)} days`;
						})()} ago
					</p>
				</div>
			</div>
		</div>
	);
}
