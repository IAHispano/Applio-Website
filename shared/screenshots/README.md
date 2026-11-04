# App screenshots

Captured on 2026-11-04 from the running applications on Windows:

- Desktop UI: Applio-App `9d2d3439`, displayed version 1.0.7. The actual exported
  interface was served by its Rust API with a separate capture configuration.
- Gradio UI: the App's pinned Applio engine `59c11310`, displayed version 3.7.1,
  running with Gradio 6.20.0. The capture used a clean source export and config.

Full-workspace captures are 1440 × 960. These are real UI captures with default
or empty workspaces, not fabricated conversion or training results. Realtime
shows the microphone permission state of the capture browser. The analyzer
result uses a generated four-second tone with harmonics to demonstrate the
waveform and spectrogram; it is not a voice recording or model-quality example.

WebP conversion preserves the screenshot composition. Raw capture tooling and
runtime configurations are kept outside the repository. No model weights,
personal recordings, machine paths, or user configuration files are published.

To refresh, run the relevant application with a clean configuration, use the
default dark theme and English labels, and capture the actual workspace. Wait
for loading and notifications to settle. Check the image for private information,
optimize it as WebP, and replace the corresponding asset. Update this provenance
and the displayed version in guide captions when the interface changes.

`shared/screenshots.ts` is the asset manifest used by both sites. The website
showcase selects four Desktop workspaces; docs use the full set.
