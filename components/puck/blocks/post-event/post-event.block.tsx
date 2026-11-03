import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { PostEventRender, type PostEventProps } from "./post-event";
export type { PostEventProps };

const text = (instructions: string) => ({
  type: "text" as const,
  contentEditable: true,
  visible: false,
  ai: { instructions },
});
const link = { type: "text" as const, ai: { exclude: true } };
const target = {
  type: "radio" as const,
  options: [
    { label: "Same tab", value: "_self" },
    { label: "New tab", value: "_blank" },
  ],
  ai: { exclude: true },
};
const toggle = {
  type: "radio" as const,
  options: [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ],
};

// Sales handoff swaps the calendar slot for the primary button, so the labels name the layouts they apply to.
const calendarToggle = { ...toggle, label: "Add to calendar button (not in sales handoff)" };
const calendarLink = { ...link, label: "Add to calendar link" };
const calendarTarget = { ...target, label: "Add to calendar link opens in" };

export const PostEventBlock: ComponentConfig<PostEventProps> = {
  fields: {
    heading: text("Thank-you headline sent after an event. Warm, under 8 words."),
    subtitle: text("1–2 sentences on what happens next, e.g. where the replay and slides are."),
    primary: text("Primary button label. 2–4 words. E.g. Watch the replay."),
    primaryHref: link,
    primaryTarget: target,
    secondary: { ...text("Secondary button label. 2–4 words. E.g. Talk to our team."), label: "Secondary button (sales handoff only)" },
    secondaryHref: { ...link, label: "Secondary button link (sales handoff only)" },
    secondaryTarget: { ...target, label: "Secondary button opens in (sales handoff only)" },
    layout: {
      type: "select" as const,
      options: [
        { label: "Thank-you", value: "thank-you" },
        { label: "Watch + next event", value: "watch + next event" },
        { label: "Sales handoff", value: "sales handoff" },
        { label: "Email-style", value: "email-style" },
      ],
    },
    nextEvent: { ...toggle, label: "Next event card (not in thank-you)" },
    nextTitle: { ...text("Title of the next event."), label: "Next event title (not in thank-you)" },
    nextMonth: { ...text("Short month for the date badge. E.g. Nov."), label: "Next event month (not in thank-you)" },
    nextDay: { ...text("Day number for the date badge. E.g. 12."), label: "Next event day (not in thank-you)" },
    nextDetail: { ...text("Time and place of the next event. E.g. 11 AM PT · Online."), label: "Next event details (not in thank-you)" },
    rsvpHref: link,
    rsvpTarget: target,
    share: toggle,
    calendar: calendarToggle,
    calendarHref: calendarLink,
    calendarTarget: calendarTarget,
    tone: {
      type: "select" as const,
      options: [
        { label: "Light", value: "light" },
        { label: "Gray", value: "gray" },
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
    heading: "Thanks for joining us.",
    subtitle: "The replay and slides are on their way to your inbox.",
    primary: "Watch the replay",
    primaryHref: "",
    primaryTarget: "_self",
    secondary: "Talk to our team",
    secondaryHref: "",
    secondaryTarget: "_self",
    layout: "watch + next event",
    nextEvent: "on",
    nextTitle: "Autopilot office hours",
    nextMonth: "Nov",
    nextDay: "12",
    nextDetail: "11 AM PT · Online",
    rsvpHref: "",
    rsvpTarget: "_self",
    share: "on",
    calendar: "on",
    calendarHref: "",
    calendarTarget: "_self",
    tone: "gray",
    width: "contained",
  },
  render: PostEventRender,
};

export const meta = defineMeta({
  title: "Post Event",
  description: "Thank-you and follow-up section for after an event, with replay and sales buttons and an optional next-event card; use for post-event nurture pages.",
  categories: ["convert"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-btn", "@p1/internal-icons"],
});
