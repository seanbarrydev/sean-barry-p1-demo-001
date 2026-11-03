import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { P1_ASSETS } from '@/lib/assets';
import { ArticleHeaderRender, type ArticleHeaderProps } from "./article-header";
export type { ArticleHeaderProps };

export const ArticleHeaderBlock: ComponentConfig<ArticleHeaderProps> = {
  fields: {
    category: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Category label in 1–3 words. Title case. E.g. Engineering, Product, Community." },
    },
    title: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Article title — compelling and specific, under 15 words." },
    },
    standfirst: {
      label: "Standfirst (not in minimal)",
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "A 1–2 sentence summary of the article. Plain text, no formatting." },
    },
    authorName: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Author's full name." },
    },
    authorAvatar: {
      type: "text" as const,
      ai: { exclude: true },
    },
    date: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Publication date. Format: Month Day, Year. E.g. April 18, 2026." },
    },
    readTime: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Estimated read time. Format: N min read." },
    },
    align: {
      label: "Align (stacked center only)",
      type: "radio" as const,
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
      ],
    },
    rule: {
      type: "radio" as const,
      options: [
        { label: "On", value: "on" },
        { label: "Off", value: "off" },
      ],
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Stacked center", value: "stacked center" },
        { label: "Left rail", value: "left rail" },
        { label: "Cover hero", value: "cover hero" },
        { label: "Minimal", value: "minimal" },
      ],
      ai: { instructions: "Stacked center is the default masthead. Left rail puts a cover image beside the text. Cover hero is a dark full-bleed masthead. Minimal drops the standfirst, tags and cover." },
    },
    image: {
      label: "Image (not in minimal)",
      type: "text" as const,
      ai: { exclude: true },
    },
    tags: {
      label: "Tags (not in minimal)",
      type: "array" as const,
      arrayFields: {
        text: { type: "text" as const, ai: { instructions: "One topic tag, 1–2 words." } },
      },
      defaultItemProps: { text: "Tag" },
      getItemSummary: (item: { text: string }) => item.text || "Tag",
    },
    byline: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    share: {
      label: "Share row (display only)",
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
  },
  defaultProps: {
    category: "Engineering",
    title: "What a year of shipping on Multidev taught us about flow.",
    standfirst:
      "A behind-the-scenes look at how the team moved from weeks to hours — and the small habits that made the difference.",
    authorName: "Jordan Ellis",
    authorAvatar: P1_ASSETS.AVATAR,
    date: "April 18, 2026",
    readTime: "6 min read",
    align: "left",
    rule: "on",
    layout: "stacked center",
    image: "",
    tags: [],
    byline: "on",
    share: "off",
  },
  render: ArticleHeaderRender,
};

export const meta = defineMeta({
  title: 'Article Header',
  description: 'Blog/article masthead with category, title, standfirst, author avatar, date and read-time, as a stacked, left-rail, cover-hero or minimal layout, with optional tags, byline and share row; use at the top of editorial pages.',
  categories: ["editorial"],
  published: true,
  registryDependencies: ["@p1/tokens","@p1/internal-img","@p1/internal-icons","@p1/internal-text"],
});
