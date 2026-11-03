import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { BigMetricRender, type BigMetricProps, type BigMetric } from "./big-metric";
export type { BigMetricProps, BigMetric };

const toggle = {
  type: "radio" as const,
  options: [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ],
};

export const BigMetricBlock: ComponentConfig<BigMetricProps> = {
  fields: {
    metrics: {
      label: "Metrics (first only in single metric and metric + quote; not in pull quote)",
      type: "array" as const,
      max: 3,
      arrayFields: {
        value: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "The headline number. Short. E.g. 38%, 2.4×, −61%." },
        },
        label: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "What the number measures. 2–5 words. E.g. Faster launches." },
        },
      },
      defaultItemProps: { value: "0%", label: "Metric" },
      getItemSummary: (item: BigMetric) => item.label || item.value || "Metric",
    },
    quote: {
      label: "Quote (not in single metric, metric trio)",
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Customer quote supporting the metric. One or two sentences, no quote marks." },
    },
    who: {
      label: "Quote attribution (not in single metric, metric trio)",
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Who said it. Name, role, company. E.g. Dana Whitfield, VP Digital, Northwind." },
    },
    mode: {
      type: "select" as const,
      options: [
        { label: "Single metric", value: "single metric" },
        { label: "Metric trio", value: "metric trio" },
        { label: "Pull quote", value: "pull quote" },
        { label: "Metric + quote", value: "metric + quote" },
      ],
    },
    attribution: toggle,
    tone: {
      type: "radio" as const,
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
    metrics: [
      { value: "38%", label: "Faster launches" },
      { value: "2.4×", label: "More releases per quarter" },
      { value: "−61%", label: "Support tickets" },
    ],
    quote: "Pantheon took release day from an event to a non-event.",
    who: "Dana Whitfield, VP Digital, Northwind",
    mode: "metric + quote",
    attribution: "on",
    tone: "dark",
    width: "contained",
  },
  render: BigMetricRender,
};

export const meta = defineMeta({
  title: "Big Metric",
  description: "One to three oversized result numbers, optionally paired with a customer quote; use on case study pages to lead with the outcome.",
  categories: ["trust"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section"],
});
