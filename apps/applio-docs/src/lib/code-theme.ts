// Light token colors keep command examples readable against the app's dark panel.
export const codeTheme = {
	name: "applio-dark",
	type: "dark" as const,
	colors: { "editor.background": "#121214", "editor.foreground": "#e7e5e4" },
	tokenColors: [
		{ scope: ["comment"], settings: { foreground: "#a3a3ad" } },
		{ scope: ["keyword", "storage"], settings: { foreground: "#c4b5fd" } },
		{ scope: ["string"], settings: { foreground: "#93c5fd" } },
		{
			scope: ["constant.numeric", "constant.language"],
			settings: { foreground: "#fcd34d" },
		},
		{
			scope: ["entity.name.function", "support.function"],
			settings: { foreground: "#86efac" },
		},
	],
};
