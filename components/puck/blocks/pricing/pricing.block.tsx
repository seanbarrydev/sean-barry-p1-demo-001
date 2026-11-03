import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { PricingRender, type PricingProps, type PricingTier } from "./pricing";
export type { PricingProps, PricingTier };

export const PricingBlock: ComponentConfig<PricingProps> = {
  fields: {
    eyebrow: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Short label above the heading. 1–3 words. E.g. Pricing." },
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
      ai: { instructions: "1–2 sentence reassurance below the heading. E.g. start free." },
    },
    tiers: {
      type: "array" as const,
      arrayFields: {
        name: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Plan name. 1–2 words. E.g. Starter, Team, Enterprise." },
        },
        price: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Displayed price. E.g. $49 or Custom." },
        },
        period: {
          type: "text" as const,
          contentEditable: true,
          ai: { instructions: "Billing period. E.g. /mo or leave blank." },
        },
        features: {
          type: "textarea" as const,
          ai: { instructions: "One feature per line. Plain text. 3–6 lines." },
        },
        buttonLabel: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "CTA label. 2–4 words. E.g. Start free trial." },
        },
        featured: {
          type: "radio" as const,
          options: [
            { label: "Off", value: "off" },
            { label: "On", value: "on" },
          ],
        },
        yearly: {
          type: "text" as const,
          ai: { instructions: "Per-month price when billed yearly, shown when the billing toggle is on. E.g. $39. Leave blank to keep the monthly price." },
        },
        blurb: {
          type: "text" as const,
          contentEditable: true,
          ai: { instructions: "One short line describing who the plan is for. Shown under the plan name in stacked rows and under the price in cards." },
        },
        buttonHref: { type: "text" as const, ai: { exclude: true } },
      },
      defaultItemProps: { name: "Plan", price: "$0", period: "/mo", features: "Feature one\nFeature two", buttonLabel: "Choose plan", featured: "off", yearly: "", blurb: "", buttonHref: "" },
      getItemSummary: (item: PricingTier) => item.name || "Tier",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Cards", value: "cards" },
        { label: "Stacked rows (no buttons or badge)", value: "stacked rows" },
      ],
    },
    billing: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
  },
  defaultProps: {
    eyebrow: "Pricing",
    heading: "Plans that scale with your portfolio.",
    subtitle: "Start free. Upgrade when your team is ready.",
    tiers: [
      { name: "Starter", price: "$0", period: "/mo", features: "1 project\nCore features\nCommunity support", buttonLabel: "Start free", featured: "off" },
      { name: "Team", price: "$49", period: "/mo", features: "Up to 10 projects\nAdvanced features\nRole-based access\nPriority support", buttonLabel: "Start free trial", featured: "on" },
      { name: "Enterprise", price: "Custom", period: "", features: "Unlimited sites\nBulk updates\nSSO & audit logs\nDedicated CSM", buttonLabel: "Contact sales", featured: "off" },
    ],
    layout: "cards",
    billing: "off",
  },
  render: PricingRender,
};

export const meta = defineMeta({
  title: 'Pricing',
  description: 'Pricing tiers as cards or stacked rows, each with name, price, period, feature list and CTA button, a featured tier, and an optional monthly/yearly toggle; use for pricing pages.',
  categories: ["convert"],
  published: true,
  registryDependencies: ["@p1/tokens","@p1/internal-btn","@p1/internal-icons"],
});
