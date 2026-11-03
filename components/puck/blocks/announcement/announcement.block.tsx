import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { AnnouncementRender, type AnnouncementProps } from "./announcement";
export type { AnnouncementProps };

export const AnnouncementBlock: ComponentConfig<AnnouncementProps> = {
  fields: {
    text: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Short announcement message. 1 sentence." },
    },
    linkLabel: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "CTA label after the message. E.g. Read more →. Leave blank to omit." },
    },
    linkHref: {
      type: "text" as const,
      ai: { exclude: true },
    },
    linkTarget: {
      type: "radio" as const,
      options: [
        { label: "Same tab", value: "_self" },
        { label: "New tab", value: "_blank" },
      ],
      ai: { exclude: true },
    },
    tone: {
      type: "select" as const,
      options: [
        { label: "Accent", value: "accent" },
        { label: "Yellow", value: "yellow" },
        { label: "Dark", value: "dark" },
        { label: "Gradient", value: "gradient" },
      ],
    },
    align: {
      type: "radio" as const,
      options: [
        { label: "Center", value: "center" },
        { label: "Left", value: "left" },
      ],
    },
    style: {
      type: "select" as const,
      options: [
        { label: "Default (use tone)", value: "default" },
        { label: "Quiet", value: "quiet" },
        { label: "Bold", value: "bold" },
        { label: "Critical", value: "critical" },
      ],
    },
    icon: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    dismissible: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
  },
  defaultProps: {
    text: "Something new just launched — take a look.",
    linkLabel: "Read the announcement →",
    linkHref: "#",
    linkTarget: "_self",
    tone: "accent",
    align: "center",
    style: "default",
    icon: "off",
    dismissible: "off",
  },
  render: AnnouncementRender,
};

export const meta = defineMeta({
  title: 'Announcement',
  description: 'Slim banner strip with a text message and optional link label in themed tones (purple/yellow/dark/gradient); use for site-wide notices.',
  categories: ["attention"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-btn", "@p1/internal-icons"],
});
