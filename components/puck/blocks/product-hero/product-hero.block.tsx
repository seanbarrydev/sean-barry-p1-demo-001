import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { ProductHeroRender, type ProductHeroProps, type ProductHeroCommand } from "./product-hero";
export type { ProductHeroProps, ProductHeroCommand };

export const ProductHeroBlock: ComponentConfig<ProductHeroProps> = {
  fields: {
    product: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Product name shown above the heading. 1–2 words. E.g. Multidev." },
    },
    heading: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Hero heading. Benefit-led, under 12 words." },
    },
    subtitle: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "1–2 sentence supporting line below the heading." },
    },
    buttonLabel: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Primary button label. 2–4 words." },
    },
    buttonHref: { type: "text" as const, ai: { exclude: true } },
    buttonTarget: {
      type: "radio" as const,
      options: [
        { label: "Same tab", value: "_self" },
        { label: "New tab", value: "_blank" },
      ],
      ai: { exclude: true },
    },
    button2Label: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Secondary button label. 2–4 words. Leave blank to hide." },
    },
    button2Href: { type: "text" as const, ai: { exclude: true } },
    button2Target: {
      type: "radio" as const,
      options: [
        { label: "Same tab", value: "_self" },
        { label: "New tab", value: "_blank" },
      ],
      ai: { exclude: true },
    },
    image: {
      label: "Screen image URL (not in code-first)",
      type: "text" as const,
      ai: { exclude: true },
    },
    commands: {
      label: "Commands (code-first only)",
      type: "array" as const,
      // Plain text lines: an inline field is one line and cannot take Enter, so a list is how an editor adds a line.
      arrayFields: { line: { type: "text" as const, ai: { instructions: "One terminal command or comment line." } } },
      defaultItemProps: { line: "terminus env:list" },
      getItemSummary: (item: ProductHeroCommand) => item.line || "Command",
      ai: { instructions: "Terminal lines shown in the code-first layout, one per item." },
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Screen right", value: "screen right" },
        { label: "Browser frame", value: "browser frame" },
        { label: "Code first", value: "code-first" },
        { label: "Full bleed", value: "full bleed" },
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
    product: "Multidev",
    heading: "A full environment for every branch.",
    subtitle: "Review, test, and approve changes in isolation, then merge with confidence.",
    buttonLabel: "Try Multidev",
    buttonHref: "#",
    buttonTarget: "_self",
    button2Label: "Read the docs",
    button2Href: "#",
    button2Target: "_self",
    image: "",
    commands: ["terminus env:create my-site dev feature-hero", "terminus multidev:merge-to-dev my-site feature-hero", "# deployed in 42s"].map((line) => ({ line })),
    layout: "screen right",
    tone: "light",
    width: "contained",
  },
  render: ProductHeroRender,
};

export const meta = defineMeta({
  title: "Product Hero",
  description: "Product landing hero with product name, heading, subtitle, two buttons and a screen, browser frame or code panel; use at the top of a product page.",
  categories: ["attention"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-btn", "@p1/internal-img"],
});
