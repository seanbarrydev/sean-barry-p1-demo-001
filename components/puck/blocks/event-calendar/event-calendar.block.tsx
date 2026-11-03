import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { EventCalendarRender, type EventCalendarProps, type CalendarEvent } from "./event-calendar";
export type { EventCalendarProps, CalendarEvent };

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

export const EventCalendarBlock: ComponentConfig<EventCalendarProps> = {
  fields: {
    eyebrow: text("Short label above the heading. 1–3 words. E.g. Events."),
    heading: text("Section heading. Under 8 words. E.g. What's coming up."),
    events: {
      type: "array" as const,
      arrayFields: {
        title: text("Event name. Under 6 words."),
        date: text("Full date. E.g. Oct 14, 2026."),
        day: text("Day of the month as a number. E.g. 14. Places the event on the grid."),
        mon: text("Three-letter month. E.g. Oct. Must match the month label to show on the grid."),
        time: text("Start time with zone. E.g. 10 AM PT."),
        format: text("Event type. E.g. Webinar, Conference, In person."),
        where: text("City or Online."),
        speakers: text("Speaker names, comma separated."),
        left: text("Capacity note. E.g. 24 left or Waitlist."),
      },
      defaultItemProps: { title: "New event", date: "Oct 1, 2026", day: "1", mon: "Oct", time: "10 AM PT", format: "Webinar", where: "Online", speakers: "", left: "Open" },
      getItemSummary: (item: CalendarEvent) => item.title || "Event",
    },
    view: {
      type: "select" as const,
      options: [
        { label: "Month grid", value: "month grid" },
        { label: "Week strip", value: "week strip" },
        { label: "Agenda", value: "agenda" },
        { label: "Map view", value: "map view" },
      ],
    },
    month: text("Month shown, as a month name and year. E.g. October 2026. The grid is built from it."),
    mapImage: { type: "text" as const, label: "Map image (map view only)", ai: { exclude: true } },
    chips: toggle,
    filter: toggle,
    ics: toggle,
    tone: {
      type: "select" as const,
      options: [
        { label: "Light", value: "light" },
        { label: "Gray", value: "gray" },
      ],
    },
    width: {
      type: "select" as const,
      options: [
        { label: "Contained", value: "contained" },
        { label: "Full bleed", value: "full bleed" },
      ],
    },
  },
  defaultProps: {
    eyebrow: "Events",
    heading: "What’s coming up",
    events: [
      { title: "Drupal Dev Days", date: "Oct 14, 2026", day: "14", mon: "Oct", time: "10 AM PT", format: "Conference", where: "Vienna", speakers: "Marcus Lee, Priya Nair", left: "24 left" },
      { title: "Headless WordPress, live", date: "Oct 21, 2026", day: "21", mon: "Oct", time: "9 AM PT", format: "Webinar", where: "Online", speakers: "Sam Ortiz", left: "120 left" },
      { title: "Agency partner summit", date: "Nov 4, 2026", day: "4", mon: "Nov", time: "1 PM ET", format: "In person", where: "New York", speakers: "Dana Whitfield", left: "Waitlist" },
      { title: "Autopilot office hours", date: "Nov 12, 2026", day: "12", mon: "Nov", time: "11 AM PT", format: "Workshop", where: "Online", speakers: "Lena Fischer", left: "Open" },
    ],
    view: "month grid",
    month: "October 2026",
    mapImage: "",
    chips: "on",
    filter: "on",
    ics: "on",
    tone: "light",
    width: "contained",
  },
  render: EventCalendarRender,
};

export const meta = defineMeta({
  title: "Event Calendar",
  description: "Event calendar with a month grid, week strip, agenda or map view, optional event chips, type filter and subscribe link; use for events pages.",
  categories: ["listings"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-icons", "@p1/internal-img", "@p1/internal-text"],
});
