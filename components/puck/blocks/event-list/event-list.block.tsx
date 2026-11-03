import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { P1_ASSETS } from "@/lib/assets";
import { EventListRender, type EventListProps, type EventItem } from "./event-list";
export type { EventListProps, EventItem };

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

export const EventListBlock: ComponentConfig<EventListProps> = {
  fields: {
    eyebrow: text("Short label above the heading. 1–3 words. E.g. Events."),
    heading: text("Section heading. Under 8 words. E.g. Upcoming events."),
    events: {
      type: "array" as const,
      arrayFields: {
        title: text("Event name. 2–6 words."),
        date: text("Full date. E.g. Oct 14, 2026."),
        day: text("Day of the month as a number. E.g. 14."),
        mon: text("Three-letter month. E.g. Oct."),
        time: text("Start time with time zone. E.g. 10 AM PT."),
        format: text("Event format tag. E.g. Webinar, Conference, Workshop."),
        where: text("City or Online."),
        speakers: text("Comma-separated speaker names."),
        left: text("Capacity note. E.g. 24 left, Waitlist, Open."),
        image: { type: "text" as const, label: "Image (featured event in featured + queue)", ai: { exclude: true } },
      },
      defaultItemProps: {
        title: "New event",
        date: "Dec 2, 2026",
        day: "2",
        mon: "Dec",
        time: "10 AM PT",
        format: "Webinar",
        where: "Online",
        speakers: "Speaker name",
        left: "Open",
        image: "",
      },
      getItemSummary: (item: EventItem) => item.title || "Event",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Stacked rows", value: "stacked rows" },
        { label: "Card grid", value: "card grid" },
        { label: "Featured + queue", value: "featured + queue" },
        { label: "Filter + list", value: "filter + list" },
      ],
    },
    dateBlock: {
      type: "radio" as const,
      options: [
        { label: "Block", value: "block" },
        { label: "Inline", value: "inline" },
      ],
    },
    format: toggle,
    speakers: toggle,
    capacity: toggle,
    rsvp: {
      type: "radio" as const,
      options: [
        { label: "Button", value: "button" },
        { label: "Link", value: "link" },
      ],
    },
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
    eyebrow: "Events",
    heading: "Upcoming events",
    events: [
      { title: "Drupal Dev Days", date: "Oct 14, 2026", day: "14", mon: "Oct", time: "10 AM PT", format: "Conference", where: "Vienna", speakers: "Marcus Lee, Priya Nair", left: "24 left", image: P1_ASSETS.PHOTO_TABLE },
      { title: "Headless WordPress, live", date: "Oct 21, 2026", day: "21", mon: "Oct", time: "9 AM PT", format: "Webinar", where: "Online", speakers: "Sam Ortiz", left: "120 left" },
      { title: "Agency partner summit", date: "Nov 4, 2026", day: "4", mon: "Nov", time: "1 PM ET", format: "In person", where: "New York", speakers: "Dana Whitfield", left: "Waitlist" },
      { title: "Autopilot office hours", date: "Nov 12, 2026", day: "12", mon: "Nov", time: "11 AM PT", format: "Workshop", where: "Online", speakers: "Lena Fischer", left: "Open" },
    ],
    layout: "stacked rows",
    dateBlock: "block",
    format: "on",
    speakers: "on",
    capacity: "on",
    rsvp: "button",
    tone: "light",
    width: "contained",
  },
  render: EventListRender,
};

export const meta = defineMeta({
  title: "Event List",
  description: "Upcoming events as stacked rows, a card grid, a featured event with a queue, or a list beside a filter column, with date, format, speakers, capacity and RSVP; use for events pages.",
  categories: ["listings"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-btn", "@p1/internal-img", "@p1/internal-text"],
});
