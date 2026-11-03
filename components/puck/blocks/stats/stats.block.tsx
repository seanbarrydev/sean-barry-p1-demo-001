import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { StatsRender, type StatsProps, type StatItem } from "./stats";
export type { StatsProps, StatItem };

export const StatsBlock: ComponentConfig<StatsProps> = {
  fields: {
    tone: {
      type: "radio" as const,
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
      ],
    },
    items: {
      label: "Stats (single hero shows the first one)",
      type: "array" as const,
      arrayFields: {
        value: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "The statistic value. E.g. 99.9% or 10k+." },
        },
        label: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Short label below the value. 2–4 words." },
        },
        caption: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Optional one-line note under the label. E.g. Last 12 months." },
        },
      },
      defaultItemProps: { value: "100%", label: "Metric", caption: "" },
      getItemSummary: (item: StatItem) => item.value || "Stat",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Row", value: "row" },
        { label: "On dark", value: "on dark" },
        { label: "Single hero", value: "single hero" },
      ],
    },
    numStyle: {
      type: "radio" as const,
      options: [
        { label: "Sans", value: "sans" },
        { label: "Serif", value: "serif" },
      ],
    },
    captionPos: {
      type: "radio" as const,
      options: [
        { label: "Below", value: "below" },
        { label: "Above", value: "above" },
      ],
    },
    source: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Optional source citation shown under the stats, such as the report name. Leave empty for none." },
    },
    sourceHref: { type: "text" as const, ai: { exclude: true } },
  },
  defaultProps: {
    tone: "light",
    items: [
      { value: "10k+", label: "Teams onboarded" },
      { value: "99.9%", label: "Uptime" },
      { value: "2M+", label: "Pages published" },
      { value: "4.9/5", label: "Customer rating" },
    ],
    layout: "row",
    numStyle: "sans",
    captionPos: "below",
    source: "",
    sourceHref: "",
  },
  render: StatsRender,
};

export const meta = defineMeta({
  title: 'Stats',
  description: 'Horizontal grid of large value+label stat items in light or dark tone; use for key metrics or social-proof numbers.',
  categories: ["trust"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-btn"],
});
