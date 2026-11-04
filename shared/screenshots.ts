import setup from "./screenshots/desktop-setup.webp";
import appearance from "./screenshots/desktop-appearance.webp";
import embedderControls from "./screenshots/desktop-embedder-controls.webp";
import datasetReview from "./screenshots/desktop-dataset-review.webp";
import pretrained from "./screenshots/gradio-pretrained.webp";
import analysisResult from "./screenshots/desktop-analysis-result.webp";
import desktopModels from "./screenshots/desktop-models.webp";
import gradioModels from "./screenshots/gradio-models.webp";
import conversion from "./screenshots/desktop-conversion.webp";
import realtime from "./screenshots/desktop-realtime.webp";
import training from "./screenshots/desktop-training.webp";
import separator from "./screenshots/desktop-separator.webp";
import tts from "./screenshots/desktop-tts.webp";
import audioTools from "./screenshots/desktop-audio-tools.webp";
import gradioConversion from "./screenshots/gradio-conversion.webp";
import gradioRealtime from "./screenshots/gradio-realtime.webp";
import gradioTraining from "./screenshots/gradio-training.webp";
import gradioTts from "./screenshots/gradio-tts.webp";
import gradioAudioTools from "./screenshots/gradio-audio-tools.webp";
import gradioBlender from "./screenshots/gradio-voice-blender.webp";

export const desktop = {
	setup,
	appearance,
	embedderControls,
	datasetReview,
	conversion,
	realtime,
	training,
	separator,
	tts,
	audioTools,
	analysisResult,
	models: desktopModels,
};
export const gradio = {
	pretrained,
	conversion: gradioConversion,
	realtime: gradioRealtime,
	training: gradioTraining,
	tts: gradioTts,
	audioTools: gradioAudioTools,
	blender: gradioBlender,
	models: gradioModels,
};

export const showcase = [
	{
		title: "Convert Audio",
		description:
			"Choose a voice model, add a recording, and adjust your conversion.",
		image: conversion,
		guide: "getting-started/inference/",
	},
	{
		title: "Text to Speech",
		description:
			"Write your script, choose a source voice, and configure voice conversion.",
		image: tts,
		guide: "getting-started/tts/",
	},
	{
		title: "Training",
		description:
			"Prepare your dataset and choose automatic or manual training.",
		image: training,
		guide: "getting-started/training/",
	},
	{
		title: "Audio Separator",
		description: "Choose a separation model and the stems you want to keep.",
		image: separator,
		guide: "guides/uvr/",
	},
];
