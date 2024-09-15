import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function MarkdownForGuides({ content }: { content: string }) {
	return (
		<Markdown
			className="text-neutral-300 md:max-w-3xl max-md:max-w-xs text-wrap flex flex-col justify-start items-start w-full h-full overflow-y-auto text-left"
			remarkPlugins={[remarkGfm]}
			components={{
				a: ({ node, children, ...props }) => (
					<a {...props} className="text-white/80 hover:underline break-words">
						{children}
					</a>
				),
				p: ({ node, children, ...props }) => (
					<p {...props} className="mb-4">
						{children}
					</p>
				),
				img: ({ node, alt, src, ...props }) => (
					<div className="w-full h-full overflow-hidden rounded-2xl">
						<img
							{...props}
							className="w-full h-full object-cover"
							alt={alt}
							src={src}
						/>
					</div>
				),
				h1: ({ node, children, ...props }) => (
					<h1 {...props} className="text-2xl font-bold mb-8 text-white">
						{children}
					</h1>
				),
				h2: ({ node, children, ...props }) => (
					<h2 {...props} className="text-xl font-bold mb-4 text-white">
						{children}
					</h2>
				),
				ul: ({ node, children, ...props }) => (
					<ul {...props} className="list-disc ml-5 mb-4">
						{children}
					</ul>
				),
				strong: ({ node, children, ...props }) => (
					<strong {...props} className="font-bold text-white">
						{children}
					</strong>
				),
				table: ({ node, children, ...props }) => (
					<div className="max-w-3xl max-md:max-w-[300px] max-md:text-xs justify-center overflow-y-auto">
						<table {...props} className="text-neutral-300 mb-12 mt-4">
							<tbody>{children}</tbody>
						</table>
					</div>
				),
				tr: ({ node, children, ...props }) => <tr {...props}>{children}</tr>,
				td: ({ node, children, ...props }) => (
					<td {...props} className="border border-white/10 px-4 py-2">
						{children}
					</td>
				),
				th: ({ node, children, ...props }) => (
					<th {...props} className="border border-white/10 px-4 py-2 font-bold">
						{children}
					</th>
				),
				code: ({ node, children, ...props }) => (
					<code
						{...props}
						className="select-all bg-white/80 text-black font-semibold text-sm rounded-lg py-0.5 px-2 m-1"
					>
						{children}
					</code>
				),
			}}
		>
			{content}
		</Markdown>
	);
}
