import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { ChallengeResultRender, type ChallengeResultProps, type ChallengeStep } from "./challenge-result";
export type { ChallengeResultProps, ChallengeStep };

export const ChallengeResultBlock: ComponentConfig<ChallengeResultProps> = {
  fields: {
    eyebrow: { type: "text" as const, contentEditable: true, visible: false, ai: { instructions: "Short label above the heading. 1-3 words. E.g. The story." } },
    heading: { type: "text" as const, contentEditable: true, visible: false, ai: { instructions: "Case study heading. Under 10 words." } },
    steps: {
      type: "array" as const,
      arrayFields: {
        label: { type: "text" as const, contentEditable: true, visible: false, ai: { instructions: "Step label. One word. E.g. Challenge, Solution, Result." } },
        title: { type: "text" as const, contentEditable: true, visible: false, ai: { instructions: "Step headline. Under 8 words." } },
        text: { type: "text" as const, contentEditable: true, visible: false, ai: { instructions: "One or two sentences describing this step." } },
        metric: { type: "text" as const, contentEditable: true, visible: false, ai: { instructions: "Optional headline number for this step. E.g. 38% faster." } },
      },
      defaultItemProps: { label: "Step", title: "Title", text: "Describe this step.", metric: "" },
      getItemSummary: (item: ChallengeStep) => item.label || "Step",
    },
    layout: { type: "select" as const, options: [{ label: "3-column", value: "3-column" }, { label: "Stacked", value: "stacked" }, { label: "Timeline", value: "timeline" }] },
    metrics: { type: "radio" as const, options: [{ label: "Off", value: "off" }, { label: "On", value: "on" }] },
    highlight: { type: "radio" as const, options: [{ label: "Off", value: "off" }, { label: "On", value: "on" }] },
    tone: { type: "select" as const, options: [{ label: "Light", value: "light" }, { label: "Gray", value: "gray" }, { label: "Dark", value: "dark" }] },
    width: { type: "select" as const, options: [{ label: "Contained", value: "contained" }, { label: "Full bleed", value: "full bleed" }] },
  },
  defaultProps: {
    eyebrow: "The story",
    heading: "From bottleneck to benchmark",
    steps: [
      { label: "Challenge", title: "Releases took weeks", text: "Forty storefronts, three CMS versions, and a manual QA pass before every push.", metric: "21 days" },
      { label: "Solution", title: "One workflow for every site", text: "Multidev for review, Autopilot for updates, and a shared upstream.", metric: "40 sites" },
      { label: "Result", title: "Shipping is routine", text: "Releases now land in hours, with visual regression on every change.", metric: "38% faster" },
    ],
    layout: "3-column",
    metrics: "on",
    highlight: "on",
    tone: "light",
    width: "contained",
  },
  render: ChallengeResultRender,
};

export const meta = defineMeta({
  title: "Challenge Result",
  description: "Case-study sections (challenge, solution, result) as columns, a stack or a timeline, with optional inline metrics and a highlighted result; use on customer stories.",
  categories: ["value"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section"],
});
