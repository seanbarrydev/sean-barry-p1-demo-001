import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { MarketplaceRender, type MarketplaceProps, type MarketplacePartner } from "./marketplace";
export type { MarketplaceProps, MarketplacePartner };

const text = (instructions: string) => ({
  type: "text" as const,
  contentEditable: true,
  visible: false,
  ai: { instructions },
});
const toggle = {
  type: "radio" as const,
  options: [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ],
};

const SOLUTIONS = ["Migrations", "Headless builds", "Performance"];
const PARTNERS: [string, string, string][] = [
  ["Brightside", "Platinum", "Agency"],
  ["Forge Digital", "Gold", "Agency"],
  ["Nimbus CDN", "Gold", "Technology"],
  ["Relay", "Silver", "Technology"],
  ["Lumen Studio", "Silver", "Agency"],
  ["Sentry Labs", "Platinum", "Technology"],
];

export const MarketplaceBlock: ComponentConfig<MarketplaceProps> = {
  fields: {
    eyebrow: text("Short label above the heading. 1–3 words. E.g. Partner directory."),
    heading: text("Directory heading. Under 8 words."),
    partners: {
      type: "array" as const,
      arrayFields: {
        name: text("Partner name."),
        tier: text("Partner tier. One of Platinum, Gold or Silver."),
        type: text("Partner type. E.g. Agency or Technology."),
        text: text("One sentence on what the partner does."),
        rating: text("Rating out of 5. E.g. 4.8."),
        solution: text("Solution group used by the by solution layout. E.g. Migrations."),
      },
      defaultItemProps: { name: "Partner", tier: "Silver", type: "Agency", text: "What this partner does.", rating: "4.5", solution: "Migrations" },
      getItemSummary: (item: MarketplacePartner) => item.name || "Partner",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Tile grid", value: "tile grid" },
        { label: "Sidebar filter + grid", value: "sidebar filter + grid" },
        { label: "Featured + grid", value: "featured + grid" },
        { label: "By solution", value: "by solution" },
      ],
    },
    density: {
      type: "radio" as const,
      options: [
        { label: "Comfortable", value: "comfortable" },
        { label: "Compact", value: "compact" },
      ],
    },
    search: toggle,
    tiers: toggle,
    reviews: toggle,
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
    eyebrow: "Partner directory",
    heading: "Find a partner",
    partners: PARTNERS.map(([name, tier, type], i) => ({
      name,
      tier,
      type,
      text: "Drupal and WordPress builds for enterprise teams.",
      rating: "4.8",
      solution: SOLUTIONS[i % SOLUTIONS.length] as string,
    })),
    layout: "sidebar filter + grid",
    density: "comfortable",
    search: "on",
    tiers: "on",
    reviews: "on",
    tone: "light",
    width: "contained",
  },
  render: MarketplaceRender,
};

export const meta = defineMeta({
  title: "Marketplace",
  description: "Partner directory of tiles with tier badges and ratings, in a tile grid, sidebar filter, featured plus grid or by solution layout; use for partner and app marketplaces.",
  categories: ["listings"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-icons", "@p1/internal-text"],
});
