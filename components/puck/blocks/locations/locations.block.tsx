import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { LocationsRender, type LocationsProps, type LocationPlace } from "./locations";
export type { LocationsProps, LocationPlace };

const text = (instructions: string) => ({
  type: "text" as const,
  contentEditable: true,
  visible: false,
  ai: { instructions },
});
const onOff = {
  type: "radio" as const,
  options: [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ],
};

export const LocationsBlock: ComponentConfig<LocationsProps> = {
  fields: {
    eyebrow: { ...text("Short label above the heading. 1–3 words. E.g. Offices."), label: "Eyebrow (not in address line)" },
    heading: { ...text("Section heading. Under 8 words. E.g. Find us."), label: "Heading (not in address line)" },
    places: {
      label: "Places (first only in map hero)",
      type: "array" as const,
      arrayFields: {
        city: text("City or office name. 1–3 words."),
        address: text("Street address on one line."),
        hours: text("Opening hours. E.g. Mon–Fri, 9 AM–6 PM PT."),
        directionsHref: { type: "text" as const, ai: { exclude: true } },
      },
      defaultItemProps: { city: "City", address: "Street address", hours: "Mon–Fri, 9 AM–5 PM", directionsHref: "" },
      getItemSummary: (item: LocationPlace) => item.city || "Location",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Map + cards", value: "map + cards" },
        { label: "Card grid", value: "card grid" },
        { label: "Map hero", value: "map hero" },
        { label: "Address line", value: "address line" },
      ],
    },
    hours: onOff,
    directions: onOff,
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
    eyebrow: "Offices",
    heading: "Find us",
    places: [
      { city: "San Francisco", address: "717 California St, San Francisco, CA", hours: "Mon–Fri, 9 AM–6 PM PT", directionsHref: "" },
      { city: "Austin", address: "600 Congress Ave, Austin, TX", hours: "Mon–Fri, 9 AM–5 PM CT", directionsHref: "" },
      { city: "London", address: "1 Finsbury Ave, London", hours: "Mon–Fri, 9 AM–5 PM GMT", directionsHref: "" },
    ],
    layout: "map + cards",
    hours: "on",
    directions: "on",
    tone: "light",
    width: "contained",
  },
  render: LocationsRender,
};

export const meta = defineMeta({
  title: "Locations",
  description: "Office locations with address, opening hours and a directions link beside a map placeholder, as cards, a grid or a single address line; use on contact pages.",
  categories: ["listings"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-btn", "@p1/internal-icons"],
});
