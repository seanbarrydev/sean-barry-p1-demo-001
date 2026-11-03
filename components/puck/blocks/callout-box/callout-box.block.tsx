import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { CalloutBoxRender, type CalloutBoxProps } from "./callout-box";
export type { CalloutBoxProps };

const onOff = [
  { label: "Off", value: "off" },
  { label: "On", value: "on" },
];

export const CalloutBoxBlock: ComponentConfig<CalloutBoxProps> = {
  fields: {
    variant: {
      type: "radio" as const,
      options: [
        { label: "Info", value: "info" },
        { label: "Warning", value: "warning" },
        { label: "Success", value: "success" },
        { label: "Critical", value: "critical" },
      ],
    },
    showTitle: { type: "radio" as const, options: onOff },
    title: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Short title. 1–3 words. Leave blank to use the variant's default (Note, Heads up, Done, Important)." },
    },
    text: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "The message. 1–2 sentences, plain text, specific and actionable." },
    },
    icon: { type: "radio" as const, options: onOff },
    dismissible: { type: "radio" as const, options: onOff },
    border: {
      type: "radio" as const,
      options: [
        { label: "Left bar", value: "left bar" },
        { label: "Outline", value: "outline" },
        { label: "None", value: "none" },
      ],
    },
  },
  defaultProps: {
    variant: "info",
    showTitle: "on",
    title: "",
    text: "Multidev environments count toward your plan limit. Delete branches you no longer need.",
    icon: "on",
    dismissible: "off",
    border: "left bar",
  },
  render: CalloutBoxRender,
};

export const meta = defineMeta({
  title: 'Callout Box',
  description: 'Status message box with info, warning, success or critical variants, optional title, icon, dismiss button and border style; use for docs notes and warnings.',
  categories: ["editorial"],
  published: true,
  registryDependencies: ["@p1/tokens","@p1/internal-icons"],
});
