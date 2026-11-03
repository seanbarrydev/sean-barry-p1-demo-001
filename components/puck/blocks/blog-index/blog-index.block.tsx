import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { P1_ASSETS } from "@/lib/assets";
import { BlogIndexRender, type BlogIndexProps, type BlogIndexPost } from "./blog-index";
export type { BlogIndexProps, BlogIndexPost };

export const BlogIndexBlock: ComponentConfig<BlogIndexProps> = {
  fields: {
    eyebrow: {
        type: "text" as const,
        contentEditable: true,
        visible: false,
        ai: { instructions: "Short label above the heading. 1-2 words. E.g. Blog." },
      },
    heading: {
        type: "text" as const,
        contentEditable: true,
        visible: false,
        ai: { instructions: "Section heading. Under 10 words." },
      },
    posts: {
      type: "array" as const,
      arrayFields: {
        image: { type: "text" as const, ai: { exclude: true } },
        title: {
        type: "text" as const,
        contentEditable: true,
        visible: false,
        ai: { instructions: "Post title. Under 12 words." },
      },
        category: {
        type: "text" as const,
        contentEditable: true,
        visible: false,
        ai: { instructions: "Post category. 1-2 words. E.g. Engineering." },
      },
        excerpt: {
        type: "text" as const,
        contentEditable: true,
        visible: false,
        ai: { instructions: "One-sentence summary of the post." },
      },
        meta: {
        type: "text" as const,
        contentEditable: true,
        visible: false,
        ai: { instructions: "Date and read time. E.g. Sep 12, 2026 · 8 min read." },
      },
      },
      defaultItemProps: { image: "", title: "Post title", category: "Category", excerpt: "A one-sentence summary of the post.", meta: "Sep 1, 2026 · 5 min read" },
      getItemSummary: (item: BlogIndexPost) => item.title || "Post",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Card grid", value: "card grid" },
        { label: "Editorial list", value: "editorial list" },
        { label: "Featured + grid", value: "featured + grid" },
        { label: "Magazine", value: "magazine" },
      ],
    },
    cover: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    excerpt: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    category: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    meta: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    pagination: {
      type: "radio" as const,
      options: [
        { label: "Numbered", value: "numbered" },
        { label: "Load more", value: "load more" },
        { label: "None", value: "none" },
      ],
    },
    tone: {
      type: "radio" as const,
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
    eyebrow: "Blog",
    heading: "Latest from the team",
    posts: [
      { image: P1_ASSETS.PHOTO_LAPTOPS, title: "Shipping a headless Drupal site in a week", category: "Engineering", excerpt: "What we learned moving a newsroom off a monolith.", meta: "Sep 12, 2026 · 8 min read" },
      { image: P1_ASSETS.PHOTO_WORKSHOP, title: "Why every branch deserves its own environment", category: "Workflow", excerpt: "Multidev, explained for people who review pull requests.", meta: "Sep 4, 2026 · 5 min read" },
      { image: P1_ASSETS.PHOTO_TOWERS, title: "Cache invalidation without the dread", category: "Performance", excerpt: "Purge the right pages, not the whole edge.", meta: "Aug 27, 2026 · 6 min read" },
      { image: P1_ASSETS.PHOTO_NIGHT, title: "Audit logs your security team will actually read", category: "Security", excerpt: "Designing for the reviewer, not the regulator.", meta: "Aug 19, 2026 · 7 min read" },
    ],
    layout: "card grid",
    cover: "on",
    excerpt: "on",
    category: "on",
    meta: "on",
    pagination: "numbered",
    tone: "light",
    width: "contained",
  },
  render: BlogIndexRender,
};

export const meta = defineMeta({
  title: "Blog Index",
  description: "List of blog posts with cover, category, excerpt and date, as a card grid, editorial list, featured grid or magazine, with a static pager that does not page; use for blog landing pages.",
  categories: ["listings"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-img"],
});
