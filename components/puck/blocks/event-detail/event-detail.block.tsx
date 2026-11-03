import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { P1_ASSETS } from "@/lib/assets";
import { EventDetailRender, type EventDetailProps } from "./event-detail";
export type { EventDetailProps };

const text = (instructions: string) => ({
  type: "text" as const,
  contentEditable: true,
  visible: false,
  ai: { instructions },
});
const toggle = {
  type: "radio" as const,
  options: [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ],
};

export const EventDetailBlock: ComponentConfig<EventDetailProps> = {
  fields: {
    image: { type: "text" as const, ai: { exclude: true } },
    format: text("Event format tag. 1–2 words. E.g. Webinar, Conference."),
    title: text("Event title. Under 10 words."),
    subtitle: text("One or two sentence summary of what attendees will get."),
    date: text("Date and time as shown. E.g. Oct 21, 2026 · 9 AM PT."),
    where: text("Location. E.g. Online, Vienna."),
    btn: { ...text("Register button label. 2–4 words. E.g. Save my seat."), label: "Register button (not in inline replay)" },
    btnHref: { type: "text" as const, label: "Register button link (not in inline replay)", ai: { exclude: true } },
    replayHref: { type: "text" as const, label: "Watch replay link (ended state, not in inline replay)", ai: { exclude: true } },
    chapters: {
      label: "Chapters (inline replay only)",
      type: "array" as const,
      arrayFields: { label: text("Chapter start time and name. E.g. 4:12 Architecture.") },
      defaultItemProps: { label: "0:00 Chapter" },
      getItemSummary: (item: { label: string }) => item.label || "Chapter",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Split + form", value: "split + form" },
        { label: "Countdown hero", value: "countdown hero" },
        { label: "Cover bleed", value: "cover bleed" },
        { label: "Inline replay", value: "inline replay" },
      ],
    },
    state: {
      type: "radio" as const,
      options: [
        { label: "Upcoming", value: "upcoming" },
        { label: "Live", value: "live" },
        { label: "Ended", value: "ended" },
      ],
    },
    countdown: { ...toggle, label: "Countdown (sample figures)" },
    addCal: { ...toggle, label: "Add to calendar link (not in split + form, inline replay)" },
    tone: {
      type: "select" as const,
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
      ],
    },
  },
  defaultProps: {
    image: P1_ASSETS.PHOTO_TABLE,
    format: "Webinar",
    title: "Headless WordPress, live",
    subtitle: "Build a decoupled front end in 45 minutes with Pantheon and Next.js.",
    date: "Oct 21, 2026 · 9 AM PT",
    where: "Online",
    btn: "Save my seat",
    btnHref: "",
    replayHref: "",
    chapters: [{ label: "0:00 Welcome" }, { label: "4:12 Architecture" }, { label: "14:30 Live build" }, { label: "38:05 Q&A" }],
    layout: "split + form",
    state: "upcoming",
    countdown: "off",
    addCal: "on",
    tone: "light",
  },
  render: EventDetailRender,
};

export const meta = defineMeta({
  title: "Event Detail",
  description: "Event page header with format tag, title, date and location, optional sample countdown, and a register action; use at the top of an event page.",
  categories: ["attention"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-btn", "@p1/internal-icons", "@p1/internal-img"],
});
