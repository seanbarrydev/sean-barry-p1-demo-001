import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { P1_LOGO } from '@/lib/assets';
import { LogoCloudRender, type LogoCloudProps, type LogoItem } from "./logos";
export type { LogoCloudProps, LogoItem };

export const LogoCloudBlock: ComponentConfig<LogoCloudProps> = {
  fields: {
    heading: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Short label above the logos. E.g. Featured in or Trusted by." },
    },
    style: {
      type: "radio" as const,
      options: [
        { label: "Mono", value: "mono" },
        { label: "Color", value: "color" },
      ],
    },
    height: {
      type: "select" as const,
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    logos: {
      label: "Logos (grid 4×2 shows the first 8)",
      type: "array" as const,
      arrayFields: {
        src: {
          type: "text" as const,
          ai: { exclude: true },
        },
        label: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Brand or publication name. E.g. Reuters." },
        },
        href: {
          type: "text" as const,
          label: "Link URL (when Linked is on)",
          ai: { exclude: true },
        },
        target: {
          type: "radio" as const,
          options: [
            { label: "Same tab", value: "_self" },
            { label: "New tab", value: "_blank" },
          ],
          ai: { exclude: true },
        },
      },
      defaultItemProps: { src: "", label: "Brand", href: "", target: "_self" },
      getItemSummary: (item: LogoItem) => item.label || "Logo",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Single row", value: "single row" },
        { label: "Two rows", value: "two rows" },
        { label: "Marquee", value: "marquee" },
        { label: "Grid 4×2", value: "grid 4×2" },
      ],
      ai: { instructions: "How the logos are arranged. Grid 4×2 shows the first eight only; marquee scrolls slowly and stays still for reduced motion." },
    },
    align: {
      type: "radio" as const,
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
      ],
      ai: { instructions: "Aligns the heading and logos. Left or center." },
    },
    linked: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
      ai: { instructions: "On turns each logo that has a link URL into a link." },
    },
  },
  defaultProps: {
    heading: "Trusted by teams like",
    style: "mono",
    height: "medium",
    logos: [
      { src: P1_LOGO, label: "Company 1" },
      { src: P1_LOGO, label: "Company 2" },
      { src: P1_LOGO, label: "Company 3" },
      { src: P1_LOGO, label: "Company 4" },
    ],
    layout: "single row",
    align: "center",
    linked: "off",
  },
  render: LogoCloudRender,
};

export const meta = defineMeta({
  title: 'Logo Cloud',
  description: 'Logo cloud row/grid of partner or customer logos in mono or color style with optional heading; use for social-proof or partner sections.',
  categories: ["trust"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-img", "@p1/internal-btn"],
});
