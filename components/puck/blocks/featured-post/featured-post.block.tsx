import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { P1_ASSETS } from "@/lib/assets";
import { FeaturedPostRender, type FeaturedPostProps, type FeaturedPostNext } from "./featured-post";
export type { FeaturedPostProps, FeaturedPostNext };

export const FeaturedPostBlock: ComponentConfig<FeaturedPostProps> = {
  fields: {
    image: {
      type: "text" as const,
      ai: { exclude: true },
    },
    category: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Short category pill. 1–2 words. E.g. Featured, Research." },
    },
    title: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Headline of the featured post. Specific, under 12 words." },
    },
    dek: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "1–2 sentence summary under the headline." },
    },
    author: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Author or team name." },
    },
    meta: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Date and read time. E.g. Sep 20, 2026 · 12 min read." },
    },
    buttonLabel: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "CTA label. 2–4 words. E.g. Read the report. Leave blank to omit." },
    },
    buttonHref: {
      type: "text" as const,
      ai: { exclude: true },
    },
    buttonTarget: {
      type: "radio" as const,
      options: [
        { label: "Same tab", value: "_self" },
        { label: "New tab", value: "_blank" },
      ],
      ai: { exclude: true },
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Split cover", value: "split cover" },
        { label: "Full-bleed image", value: "full-bleed image" },
        { label: "Hero + 2 next", value: "hero + 2 next" },
        { label: "Centered editorial", value: "centered editorial" },
      ],
      ai: { instructions: "Split cover pairs text with a cover image. Full-bleed image puts the text over a dark photo. Hero + 2 next adds a short list of two upcoming posts. Centered editorial is text only." },
    },
    imagePos: {
      type: "radio" as const,
      options: [
        { label: "Right", value: "right" },
        { label: "Left", value: "left" },
      ],
    },
    nextPosts: {
      label: "Next posts (hero + 2 next only)",
      type: "array" as const,
      arrayFields: {
        category: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Category of the next post. 1–2 words." },
        },
        title: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Title of the next post. Under 12 words." },
        },
      },
      defaultItemProps: { category: "Engineering", title: "Post title" },
      getItemSummary: (item: FeaturedPostNext) => item.title || "Post",
      ai: { instructions: "Two short teasers shown beside the featured post in the Hero + 2 next layout." },
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
    image: P1_ASSETS.PHOTO_WORKSHOP,
    category: "Featured",
    title: "The state of WebOps, 2026",
    dek: "What 1,200 web teams told us about shipping, security, and staying sane.",
    author: "Pantheon Research",
    meta: "Sep 20, 2026 · 12 min read",
    buttonLabel: "Read the report",
    buttonHref: "#",
    buttonTarget: "_self",
    layout: "split cover",
    imagePos: "right",
    nextPosts: [
      { category: "Engineering", title: "How we cut deploy time in half" },
      { category: "Security", title: "A practical guide to supply chain hygiene" },
    ],
    tone: "light",
    width: "contained",
  },
  render: FeaturedPostRender,
};

export const meta = defineMeta({
  title: "Featured Post",
  description: "Lead article feature with category, headline, dek, byline and read button in split cover, full-bleed image, hero with next posts or centered layouts; use at the top of a blog or news page.",
  categories: ["attention"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-btn", "@p1/internal-img", "@p1/internal-text"],
});
