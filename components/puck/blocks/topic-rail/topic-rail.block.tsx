import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { TopicRailRender, type TopicRailProps, type Topic } from "./topic-rail";
export type { TopicRailProps, Topic };

const toggle = {
  type: "radio" as const,
  options: [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ],
};

export const TopicRailBlock: ComponentConfig<TopicRailProps> = {
  fields: {
    topics: {
      type: "array" as const,
      arrayFields: {
        label: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Topic name. 1–3 words. E.g. Engineering." },
        },
        count: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Number of posts under the topic. Digits only. E.g. 42." },
        },
      },
      defaultItemProps: { label: "Topic", count: "0" },
      getItemSummary: (item: Topic) => item.label || "Topic",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Chip row", value: "chip row" },
        { label: "Sidebar list", value: "sidebar list" },
        { label: "Tag cloud", value: "tag cloud" },
        { label: "Mega filter", value: "mega filter" },
      ],
    },
    counts: toggle,
    search: toggle,
    sort: {
      type: "select" as const,
      options: [
        { label: "Newest", value: "Newest" },
        { label: "Popular", value: "Popular" },
        { label: "A–Z", value: "A–Z" },
      ],
    },
    tone: {
      type: "select" as const,
      options: [
        { label: "Light", value: "light" },
        { label: "Gray", value: "gray" },
      ],
    },
    width: {
      type: "select" as const,
      options: [
        { label: "Contained", value: "contained" },
        { label: "Full bleed", value: "full bleed" },
      ],
    },
  },
  defaultProps: {
    topics: [
      { label: "All", count: "128" },
      { label: "Engineering", count: "42" },
      { label: "Workflow", count: "31" },
      { label: "Performance", count: "24" },
      { label: "Security", count: "18" },
      { label: "Customer stories", count: "13" },
    ],
    layout: "chip row",
    counts: "on",
    search: "on",
    sort: "Newest",
    tone: "light",
    width: "contained",
  },
  render: TopicRailRender,
};

export const meta = defineMeta({
  title: 'Topic rail',
  description: 'Topic filter for a blog or resource index as a chip row, sidebar list, tag cloud or mega filter panel, with optional counts, search box and sort label; static, no live filtering.',
  categories: ["listings"],
  published: true,
  registryDependencies: ["@p1/tokens","@p1/internal-section","@p1/internal-btn","@p1/internal-icons"],
});
