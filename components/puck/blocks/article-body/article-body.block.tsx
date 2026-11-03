import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { ArticleBodyRender, type ArticleBodyProps } from "./article-body";
export type { ArticleBodyProps };

const onOff = [
  { label: "Off", value: "off" },
  { label: "On", value: "on" },
];

export const ArticleBodyBlock: ComponentConfig<ArticleBodyProps> = {
  fields: {
    lead: {
      type: "richtext" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Opening paragraph of the article. 1–3 sentences that set up the story." },
    },
    heading: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "First subheading, above the body copy. Under 6 words." },
    },
    body: {
      type: "richtext" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Body copy under the first subheading. A few short paragraphs of plain prose." },
    },
    pull: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Pull quote lifted from the article. One sentence. Leave blank to hide." },
    },
    caption: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Caption under the figure. One short line. Leave blank to hide." },
    },
    image: {
      label: "Figure image URL",
      type: "text" as const,
      ai: { exclude: true },
    },
    code: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Code sample shown in a monospace block, no highlighting. One command or short snippet. Leave blank to hide." },
    },
    toc: {
      label: "Table of contents (TOC sidebar only)",
      type: "array" as const,
      // Plain field: these are entries in a list, not text on the canvas.
      arrayFields: { label: { type: "text" as const, ai: { instructions: "Heading in the article, shown in the on-this-page list. Short." } } },
      defaultItemProps: { label: "Section" },
      getItemSummary: (item: { label: string }) => item.label || "Section",
    },
    width: {
      type: "radio" as const,
      options: [
        { label: "Narrow", value: "narrow" },
        { label: "Wide", value: "wide" },
      ],
    },
    sidebar: {
      type: "select" as const,
      options: [
        { label: "None", value: "none" },
        { label: "TOC", value: "TOC" },
        { label: "Share", value: "share" },
      ],
    },
    dropCap: { type: "radio" as const, options: onOff },
    font: {
      type: "radio" as const,
      options: [
        { label: "Sans", value: "sans" },
        { label: "Serif", value: "serif" },
      ],
    },
    tone: {
      type: "select" as const,
      options: [
        { label: "Light", value: "light" },
        { label: "Gray", value: "gray" },
      ],
    },
  },
  defaultProps: {
    lead: "<p>Every migration starts with a list of things nobody wants to touch. Ours had forty-one items, and the first was the search index.</p>",
    heading: "Decouple first",
    body: "<p>We started by decoupling content from presentation. That meant a stable API, a preview environment per change, and a front end the editors never had to think about.</p>",
    pull: "The best migration plan is the one your editors barely notice.",
    caption: "The decoupled architecture at launch.",
    image: "",
    code: "terminus multidev:create my-site feature-api",
    toc: ["Decouple first", "Preview per change", "Launch day"].map((label) => ({ label })),
    width: "narrow",
    sidebar: "TOC",
    dropCap: "off",
    font: "serif",
    tone: "light",
  },
  render: ArticleBodyRender,
};

export const meta = defineMeta({
  title: 'Article Body',
  description: 'Long-form article column with opening paragraph, subheading, figure, pull quote and code sample, plus an optional table-of-contents or share sidebar; use for blog and editorial posts.',
  categories: ["editorial"],
  published: true,
  registryDependencies: ["@p1/tokens","@p1/internal-section","@p1/internal-icons","@p1/internal-rich","@p1/internal-img"],
});
