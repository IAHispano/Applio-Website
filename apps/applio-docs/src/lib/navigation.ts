import { ecosystem } from "../../../../shared/ecosystem";

export const navigation = [
	{
		label: "Start here",
		items: [
			["Welcome", "/"],
			["Applio ecosystem", ecosystem.links.ecosystem],
			["Installation", "/getting-started/installation/"],
			["Meet Desktop", "/getting-started/desktop/"],
		],
	},
	{
		label: "Voice conversion",
		items: [
			["Convert audio", "/getting-started/inference/"],
			["Realtime", "/getting-started/realtime/"],
			["Text to speech", "/getting-started/tts/"],
		],
	},
	{
		label: "Models & training",
		items: [
			["Add a voice model", "/getting-started/installing-inference-models/"],
			["Embedders", "/getting-started/embedder/"],
			["Training pretrainings", "/getting-started/pretrained/"],
			["Prepare a dataset", "/guides/how-create-datasets/"],
			["Train a model", "/getting-started/training/"],
			["Voice Blender", "/getting-started/voice-blender/"],
			["TensorBoard", "/getting-started/tensorboard/"],
		],
	},
	{
		label: "Audio tools & extensions",
		items: [
			["Separate audio", "/guides/uvr/"],
			["Analyze audio & pitch", "/getting-started/audio-analyzer/"],
			["KaraFan", "/guides/karafan/"],
			["Gradio plugins", "/getting-started/plugins/"],
		],
	},
	{
		label: "Manage Applio",
		items: [
			["Migration & storage", "/guides/moving-to-desktop/"],
			["Troubleshooting", "/getting-started/report-error/"],
			["Cloud workflows", "/getting-started/cloud-guides/"],
		],
	},
	{
		label: "Reference",
		items: [
			["How voice conversion works", "/reference/architecture/"],
			["Command-line interface", "/reference/cli/"],
			["Glossary", "/reference/glossary/"],
			["Terms of Use", "/tos/"],
		],
	},
];

export const pages = navigation
	.flatMap((group) =>
		group.items.map(([label, href]) => ({ label, href, group: group.label })),
	)
	.filter((page) => page.href.startsWith("/"));
