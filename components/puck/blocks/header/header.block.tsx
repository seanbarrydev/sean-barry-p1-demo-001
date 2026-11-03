import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { HeaderRender, type HeaderProps, type HeaderLink, type HeaderMegaItem } from "./header";
export type { HeaderProps, HeaderLink, HeaderMegaItem };

export const HeaderBlock: ComponentConfig<HeaderProps> = {
  fields: {
    logo: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Brand name or wordmark shown in the header." },
    },
    links: {
      label: "Links (not in minimal)",
      type: "array",
      arrayFields: {
        label: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Nav link label. 1–2 words." },
        },
        href: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { exclude: true },
        },
      },
      defaultItemProps: { label: "Link", href: "#" },
      getItemSummary: (item: HeaderLink) => item.label || "Link",
    },
    navAlign: {
      type: "select" as const,
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    showSearch: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    ctaLabel: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Header CTA label. 2–4 words." },
    },
    ctaHref: {
      type: "text" as const,
      ai: { exclude: true },
    },
    ctaTarget: {
      type: "radio" as const,
      options: [
        { label: "Same tab", value: "_self" },
        { label: "New tab", value: "_blank" },
      ],
      ai: { exclude: true },
    },
    ctaStyle: {
      type: "select" as const,
      options: [
        { label: "Primary", value: "primary" },
        { label: "Yellow", value: "yellow" },
        { label: "Purple", value: "purple" },
        { label: "Outline", value: "outline" },
        { label: "None", value: "none" },
      ],
    },
    tone: {
      type: "select" as const,
      options: [
        { label: "White", value: "white" },
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
      ],
    },
    border: {
      type: "radio" as const,
      options: [
        { label: "On", value: "on" },
        { label: "Off", value: "off" },
      ],
    },
    sticky: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Logo left", value: "logo left" },
        { label: "Centered", value: "centered" },
        { label: "Minimal", value: "minimal" },
        { label: "Mega open", value: "mega open" },
      ],
    },
    ctaSecondary: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Optional second CTA label shown beside the primary one. 1–3 words, or empty." },
    },
    ctaSecondaryHref: {
      type: "text" as const,
      ai: { exclude: true },
    },
    ctaSecondaryTarget: {
      type: "radio" as const,
      options: [
        { label: "Same tab", value: "_self" },
        { label: "New tab", value: "_blank" },
      ],
      ai: { exclude: true },
    },
    megaItems: {
      label: "Menu panel items (mega open only)",
      type: "array",
      arrayFields: {
        title: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Menu panel item title. 2–4 words." },
        },
        text: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "One short line describing the item." },
        },
        href: {
          type: "text" as const,
          ai: { exclude: true },
        },
      },
      defaultItemProps: { title: "Menu item", text: "A short line about this page.", href: "#" },
      getItemSummary: (item: HeaderMegaItem) => item.title || "Menu item",
    },
  },
  defaultProps: {
    logo: "Pantheon",
    links: [
      { label: "Product", href: "#" },
      { label: "Solutions", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Customers", href: "#" },
    ],
    navAlign: "center",
    showSearch: "on",
    ctaLabel: "Start for free",
    ctaHref: "#",
    ctaTarget: "_self",
    ctaStyle: "primary",
    tone: "white",
    border: "on",
    sticky: "off",
    layout: "logo left",
    ctaSecondary: "",
    ctaSecondaryHref: "#",
    ctaSecondaryTarget: "_self",
    megaItems: [
      { title: "Menu item one", text: "A short line about this page.", href: "#" },
      { title: "Menu item two", text: "A short line about this page.", href: "#" },
      { title: "Menu item three", text: "A short line about this page.", href: "#" },
    ],
  },
  render: HeaderRender,
};

export const meta = defineMeta({
  title: 'Header',
  description: 'Site navigation bar with logo, nav links, optional search, and CTA buttons in white/light/dark tones, in logo-left, centered, minimal or mega-menu layouts; use as the page header/navbar.',
  categories: ["global"],
  published: true,
  registryDependencies: ["@p1/tokens","@p1/internal-btn","@p1/internal-icons"],
});
