import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { textOf } from "@/lib/text";
import {
  WebinarReplayRender,
  type WebinarReplayProps,
  type WebinarChapter,
  type WebinarTranscriptLine,
  type WebinarDownload,
  type WebinarLibraryItem,
} from "./webinar-replay";
export type { WebinarReplayProps, WebinarChapter, WebinarTranscriptLine, WebinarDownload, WebinarLibraryItem };

const toggle = {
  type: "radio" as const,
  options: [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ],
};

export const WebinarReplayBlock: ComponentConfig<WebinarReplayProps> = {
  fields: {
    title: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Webinar title. Under 10 words. E.g. Headless WordPress, live, replay." },
    },
    chapters: {
      label: "Chapters (not in gated replay, on-demand library)",
      type: "array" as const,
      arrayFields: {
        time: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Chapter start time. E.g. 4:12." },
    },
        title: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Chapter name. 2–5 words. E.g. Architecture overview." },
    },
      },
      defaultItemProps: { time: "0:00", title: "Chapter" },
      getItemSummary: (item: WebinarChapter) => item.title || "Chapter",
    },
    transcript: {
      label: "Transcript (not in gated replay, on-demand library)",
      type: "array" as const,
      arrayFields: {
        text: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "One paragraph of the transcript. Plain text." },
    },
      },
      defaultItemProps: { text: "Transcript paragraph." },
      getItemSummary: (item: WebinarTranscriptLine) => (item.text || "").slice(0, 40) || "Paragraph",
    },
    speaker: {
      label: "Speaker (not in on-demand library)",
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Speaker full name. E.g. Sam Ortiz." },
    },
    role: {
      label: "Speaker role (not in on-demand library)",
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Speaker job title and company. E.g. Head of design, Pantheon." },
    },
    downloads: {
      label: "Downloads (not in on-demand library)",
      type: "array" as const,
      arrayFields: {
        label: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Name of a downloadable file. E.g. Slides (PDF)." },
    },
      },
      defaultItemProps: { label: "Download" },
      getItemSummary: (item: WebinarDownload) => item.label || "Download",
    },
    library: {
      label: "Library (on-demand library only)",
      type: "array" as const,
      arrayFields: {
        title: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Webinar title. Under 8 words." },
    },
        speaker: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Speaker full name." },
    },
        length: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Run time. E.g. 46 min." },
    },
        // Plain field: the tag becomes a filter chip, so it must stay a string.
        tag: { type: "text" as const, ai: { instructions: "One-word topic. E.g. Headless, Drupal." } },
      },
      defaultItemProps: { title: "Webinar title", speaker: "Speaker", length: "30 min", tag: "Topic" },
      getItemSummary: (item: WebinarLibraryItem) => textOf(item.title) || "Webinar",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Player + chapters", value: "player + chapters" },
        { label: "Player + transcript", value: "player + transcript" },
        { label: "Gated replay", value: "gated replay" },
        { label: "On-demand library", value: "on-demand library" },
      ],
    },
    speakerCard: { ...toggle, label: "Speaker card (not in on-demand library)" },
    downloadsOn: { ...toggle },
    upNext: { ...toggle, label: "Up next strip (not in on-demand library)" },
    nextTitle: {
      label: "Up next title (not in on-demand library)",
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Title of the next event. E.g. Autopilot office hours." },
    },
    nextHref: { type: "text" as const, label: "Up next link (not in on-demand library)", ai: { exclude: true } },
    tone: {
      type: "select" as const,
      options: [
        { label: "Light", value: "light" },
        { label: "Gray", value: "gray" },
        { label: "Dark", value: "dark" },
      ],
    },
    width: {
      type: "radio" as const,
      options: [
        { label: "Contained", value: "contained" },
        { label: "Full bleed", value: "full bleed" },
      ],
    },
  },
  defaultProps: {
    title: "Headless WordPress, live, replay",
    chapters: [
      { time: "0:00", title: "Welcome" },
      { time: "4:12", title: "Architecture overview" },
      { time: "14:30", title: "Live build" },
      { time: "38:05", title: "Q&A" },
    ],
    transcript: [
      {
        text: "Thanks everyone for joining. Today we’ll build a decoupled front end from scratch, starting with the content model and working out to the edge.",
      },
    ],
    speaker: "Sam Ortiz",
    role: "Head of design, Pantheon",
    downloads: [{ label: "Slides (PDF)" }, { label: "Starter repo" }],
    library: [
      { title: "Headless WordPress, live", speaker: "Sam Ortiz", length: "46 min", tag: "Headless" },
      { title: "Drupal Dev Days keynote", speaker: "Marcus Lee", length: "38 min", tag: "Drupal" },
      { title: "Autopilot office hours", speaker: "Lena Fischer", length: "52 min", tag: "Workflow" },
      { title: "Agency partner summit recap", speaker: "Dana Whitfield", length: "29 min", tag: "Agency" },
      { title: "Multidev for teams", speaker: "Priya Nair", length: "41 min", tag: "Workflow" },
      { title: "Core Web Vitals clinic", speaker: "Sam Ortiz", length: "35 min", tag: "Performance" },
    ],
    layout: "player + chapters",
    speakerCard: "on",
    downloadsOn: "on",
    upNext: "on",
    nextTitle: "Autopilot office hours",
    nextHref: "",
    tone: "light",
    width: "contained",
  },
  render: WebinarReplayRender,
};

export const meta = defineMeta({
  title: "Webinar replay",
  description:
    "Webinar replay page with a poster player, chapter and transcript tabs, speaker card, downloads and an up-next strip; also a gated replay panel (layout only, nothing submits) and an on-demand library grid.",
  categories: ["listings"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-btn", "@p1/internal-icons", "@p1/internal-text"],
});
