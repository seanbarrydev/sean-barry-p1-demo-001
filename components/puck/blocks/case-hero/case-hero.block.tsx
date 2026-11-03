import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { P1_ASSETS } from "@/lib/assets";
import { CaseHeroRender, type CaseHeroProps } from "./case-hero";
export type { CaseHeroProps };

const text = (instructions: string) => ({
  type: "text" as const,
  contentEditable: true,
  visible: false,
  ai: { instructions },
});

export const CaseHeroBlock: ComponentConfig<CaseHeroProps> = {
  fields: {
    imageSrc: { type: "text" as const, ai: { exclude: true } },
    customer: { ...text("Customer name, shown as a wordmark in the logo bar layout. E.g. Northwind."), label: "Customer (logo bar above only)" },
    industry: { ...text("Industry tag shown beside the Case study pill. 1–2 words. E.g. Retail."), label: "Industry (not in logo bar above)" },
    heading: text("Case study headline: the outcome for the customer. Under 14 words."),
    subtitle: text("One-sentence summary of the customer and what changed."),
    stat: { ...text("Headline result number. E.g. 38%. Shown large in the stat-first layout."), label: "Stat (stat-first only)" },
    statLabel: { ...text("What the stat measures. 2–4 words. E.g. faster launches."), label: "Stat label (stat-first only)" },
    buttonLabel: text("CTA label. 2–4 words. E.g. Read the story."),
    buttonHref: { type: "text" as const, ai: { exclude: true } },
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
        { label: "Split + photo", value: "split + photo" },
        { label: "Stat first", value: "stat-first" },
        { label: "Magazine", value: "magazine" },
        { label: "Logo bar above", value: "logo bar above" },
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
      type: "radio" as const,
      options: [
        { label: "Contained", value: "contained" },
        { label: "Full bleed", value: "full bleed" },
      ],
    },
  },
  defaultProps: {
    imageSrc: P1_ASSETS.HERO,
    customer: "Northwind",
    industry: "Retail",
    heading: "How Northwind cut release time from weeks to hours",
    subtitle: "A regional retailer moved 40 storefronts onto one platform.",
    stat: "38%",
    statLabel: "faster launches",
    buttonLabel: "Read the story",
    buttonHref: "",
    buttonTarget: "_self",
    layout: "split + photo",
    tone: "light",
    width: "contained",
  },
  render: CaseHeroRender,
};

export const meta = defineMeta({
  title: "Case Hero",
  description: "Case study hero with customer, industry tag, headline, summary, hero stat and CTA in four layouts; use at the top of a customer story page.",
  categories: ["attention"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-btn", "@p1/internal-img"],
});
