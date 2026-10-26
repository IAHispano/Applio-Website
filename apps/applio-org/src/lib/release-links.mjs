export const DESKTOP_DOWNLOADS = [
	{
		id: "btn-windows",
		suffix: "Windows-Setup.exe",
		nativeSuffix: "_x64-setup.exe",
		label: "Download (.exe)",
	},
	{
		id: "link-mac-arm-dmg",
		suffix: "macOS-arm64.dmg",
		nativeSuffix: "_aarch64.dmg",
		label: "Download Apple Silicon (.dmg)",
	},
	{
		id: "link-mac-intel-dmg",
		suffix: "macOS-x64.dmg",
		nativeSuffix: "_x64.dmg",
		label: "Download Intel Mac (.dmg)",
	},
	{
		id: "link-mac-arm-zip",
		suffix: "macOS-arm64.zip",
		label: "Download Apple Silicon (.zip)",
	},
	{
		id: "link-mac-intel-zip",
		suffix: "macOS-x64.zip",
		label: "Download Intel Mac (.zip)",
	},
	{
		id: "link-linux-appimage",
		suffix: "Linux.AppImage",
		nativeSuffix: "_amd64.AppImage",
		label: "Download AppImage",
	},
	{
		id: "link-linux-deb",
		suffix: "Linux.deb",
		nativeSuffix: "_amd64.deb",
		label: "Download .deb",
	},
];

// Upgrade release-page fallbacks only for official, version-matched installers.
export function resolveDesktopRelease(release) {
	if (
		!release ||
		release.draft ||
		release.prerelease ||
		typeof release.tag_name !== "string" ||
		!/^v?\d+\.\d+\.\d+$/.test(release.tag_name) ||
		!Array.isArray(release.assets)
	)
		return null;
	const tag = release.tag_name;
	const version = tag.replace(/^v/, "");
	const downloads = [];
	for (const target of DESKTOP_DOWNLOADS) {
		const filenames = [`Applio-${version}-${target.suffix}`];
		if (target.nativeSuffix)
			filenames.push(`Applio_${version}${target.nativeSuffix}`);
		for (const asset of release.assets) {
			if (
				!filenames.includes(asset?.name) ||
				typeof asset.browser_download_url !== "string"
			)
				continue;
			try {
				const url = new URL(asset.browser_download_url);
				if (
					url.protocol === "https:" &&
					url.hostname === "github.com" &&
					!url.port &&
					!url.username &&
					!url.password &&
					!url.search &&
					!url.hash &&
					url.pathname ===
						`/IAHispano/Applio-App/releases/download/${tag}/${asset.name}`
				) {
					downloads.push({
						id: target.id,
						label: target.label,
						href: url.href,
					});
					break;
				}
			} catch {
				/* malformed data keeps the official release-page fallback */
			}
		}
	}
	return downloads.length ? { tag, downloads } : null;
}
