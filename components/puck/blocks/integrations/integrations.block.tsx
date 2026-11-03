import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { IntegrationsRender, type IntegrationsProps, type IntegrationItem } from "./integrations";
export type { IntegrationsProps, IntegrationItem };

export const IntegrationsBlock: ComponentConfig<IntegrationsProps> = {
  fields: {
    eyebrow: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Short label above the heading. 1–3 words. E.g. Integrations." },
    },
    heading: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Section heading. Value-focused, under 10 words." },
    },
    subtitle: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Optional 1–2 sentence line below the heading." },
    },
    items: {
      type: "array" as const,
      arrayFields: {
        name: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Tool or service name. 1–2 words. E.g. GitHub." },
        },
        category: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Category used for the filter chips. 1 word. E.g. Code, Chat, CDN." },
        },
      },
      defaultItemProps: { name: "Integration", category: "Category" },
      getItemSummary: (item: IntegrationItem) => item.name || "Integration",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Grid", value: "grid" },
        { label: "With filters", value: "with filters" },
        { label: "Logo cluster", value: "logo cluster" },
      ],
    },
    search: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    categories: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    cols: {
      type: "select" as const,
      options: [
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
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
      type: "select" as const,
      options: [
        { label: "Contained", value: "contained" },
        { label: "Full bleed", value: "full bleed" },
      ],
    },
  },
  defaultProps: {
    eyebrow: "Integrations",
    heading: "Works with the tools you already use",
    subtitle: "",
    items: [
      { name: "GitHub", category: "Code" },
      { name: "GitLab", category: "Code" },
      { name: "Bitbucket", category: "Code" },
      { name: "Slack", category: "Chat" },
      { name: "New Relic", category: "Monitoring" },
      { name: "Datadog", category: "Monitoring" },
      { name: "Fastly", category: "CDN" },
      { name: "Cloudflare", category: "CDN" },
      { name: "Jira", category: "Planning" },
      { name: "Figma", category: "Design" },
    ],
    layout: "with filters",
    search: "on",
    categories: "on",
    cols: "5",
    tone: "light",
    width: "contained",
  },
  render: IntegrationsRender,
};

export const meta = defineMeta({
  title: "Integrations",
  description: "Grid of integration tiles with an optional search box and category chips (static, no live filtering), or a logo cluster; use to show the tools a product connects to.",
  categories: ["value"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-icons", "@p1/internal-text"],
});
