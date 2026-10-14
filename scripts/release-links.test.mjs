import assert from "node:assert/strict";
import test from "node:test";
import {
	DESKTOP_DOWNLOADS,
	resolveDesktopRelease,
} from "../apps/applio-org/src/lib/release-links.mjs";
const tag = "v0.2.9";
const asset = (suffix, overrides = {}) => ({
	name: `Applio-0.2.9-${suffix}`,
	browser_download_url: `https://github.com/IAHispano/Applio-App/releases/download/${tag}/Applio-0.2.9-${suffix}`,
	...overrides,
});
const release = (assets, overrides = {}) => ({
	tag_name: tag,
	assets,
	...overrides,
});
test("resolves all seven supported installers", () => {
	const result = resolveDesktopRelease(
		release(DESKTOP_DOWNLOADS.map((item) => asset(item.suffix))),
	);
	assert.equal(result.tag, tag);
	assert.deepEqual(
		result.downloads.map((item) => item.id),
		DESKTOP_DOWNLOADS.map((item) => item.id),
	);
});
test("partial releases leave missing platforms on their fallback", () => {
	assert.deepEqual(
		resolveDesktopRelease(release([asset("Linux.AppImage")])).downloads.map(
			(item) => item.id,
		),
		["link-linux-appimage"],
	);
});
test("unavailable, malformed, draft, or prerelease data retains fallbacks", () => {
	for (const value of [
		null,
		{},
		release([]),
		release([asset("Windows-Setup.exe")], { draft: true }),
		release([asset("Windows-Setup.exe")], { prerelease: true }),
		release([asset("Windows-Setup.exe")], { tag_name: "v0.2.9-beta" }),
		release([
			null,
			{},
			{
				name: "Applio-0.2.9-Windows-Setup.exe",
				browser_download_url: "broken",
			},
		]),
	]) {
		assert.equal(resolveDesktopRelease(value), null);
	}
});
test("does not select generic executables, blockmaps, wrong versions, or platforms", () => {
	assert.equal(
		resolveDesktopRelease(
			release([
				asset("Windows-Setup.exe", { name: "unrelated.exe" }),
				asset("macOS-arm64.dmg.blockmap"),
				asset("Windows-Setup.exe", { name: "Applio-0.1.2-Windows-Setup.exe" }),
				asset("Windows-arm64-Setup.exe"),
			]),
		),
		null,
	);
});
test("rejects unexpected asset hosts, repositories, schemes, and URL decorations", () => {
	const url = asset("Windows-Setup.exe").browser_download_url;
	for (const bad of [
		url.replace("github.com", "github.com.example.org"),
		url.replace("/IAHispano/Applio-App/", "/someone/other/"),
		url.replace("/v0.2.9/", "/v0.1.2/"),
		url.replace("https:", "http:"),
		`${url}?redirect=elsewhere`,
		`${url}#fragment`,
		url.replace("https://", "https://user:pass@"),
		url.replace("github.com", "github.com:444"),
	]) {
		assert.equal(
			resolveDesktopRelease(
				release([asset("Windows-Setup.exe", { browser_download_url: bad })]),
			),
			null,
		);
	}
});
