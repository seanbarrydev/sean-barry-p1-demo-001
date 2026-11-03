import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { PartnerDetailRender, type PartnerDetailProps, type PartnerStat, type PartnerLine } from "./partner-detail";
export type { PartnerDetailProps, PartnerStat, PartnerLine };

const text = (instructions: string) => ({
  type: "text" as const,
  contentEditable: true,
  visible: false,
  ai: { instructions },
});

export const PartnerDetailBlock: ComponentConfig<PartnerDetailProps> = {
  fields: {
    name: text("Partner name. E.g. Brightside."),
    tier: text("Partner tier. E.g. Platinum, Gold or Silver."),
    tagline: text("One-line description of the partner. Under 12 words."),
    about: text("2–3 sentence overview of the partner and its relationship with Pantheon."),
    capabilities: {
      type: "array" as const,
      arrayFields: { label: text("A capability. 2–4 words. E.g. Migrations.") },
      defaultItemProps: { label: "Capability" },
      getItemSummary: (item: PartnerLine) => item.label || "Capability",
    },
    certs: {
      label: "Certifications (not in install / connect)",
      type: "array" as const,
      arrayFields: { label: text("A certification name. E.g. Drupal Certified.") },
      defaultItemProps: { label: "Certification" },
      getItemSummary: (item: PartnerLine) => item.label || "Certification",
    },
    stats: {
      label: "Stats (stat band only)",
      type: "array" as const,
      arrayFields: {
        value: text("The statistic value. E.g. 140+ or 4.9."),
        label: text("Short label for the value. 2–4 words."),
      },
      defaultItemProps: { value: "100", label: "Metric" },
      getItemSummary: (item: PartnerStat) => item.value || "Stat",
    },
    primary: { ...text("Primary button label. 2–3 words. E.g. Contact partner."), label: "Primary button (not in install / connect)" },
    secondary: { ...text("Secondary button label. 2–4 words. E.g. View case studies."), label: "Secondary button (not in install / connect)" },
    primaryHref: { type: "text" as const, label: "Primary button link (Connect in install / connect)", ai: { exclude: true } },
    secondaryHref: { type: "text" as const, label: "Secondary button link (Setup docs in install / connect)", ai: { exclude: true } },
    connectTitle: { ...text("Heading of the connect panel. E.g. Connect to Pantheon."), label: "Connect panel heading (install / connect only)" },
    steps: {
      label: "Connect steps (install / connect only)",
      type: "array" as const,
      arrayFields: { label: text("A connect step. 2–4 words. E.g. Authorize access.") },
      defaultItemProps: { label: "Step" },
      getItemSummary: (item: PartnerLine) => item.label || "Step",
    },
    permissions: {
      label: "Permissions (install / connect only)",
      type: "array" as const,
      arrayFields: { label: text("A permission the connection asks for. E.g. Read site metadata.") },
      defaultItemProps: { label: "Permission" },
      getItemSummary: (item: PartnerLine) => item.label || "Permission",
    },
    connectNote: { ...text("Small status line under the connect buttons. E.g. Not connected · takes under a minute."), label: "Connect note (install / connect only)" },
    layout: {
      type: "select" as const,
      options: [
        { label: "Header + sidebar", value: "header + sidebar" },
        { label: "Stat band", value: "stat band" },
        { label: "Long form", value: "long-form" },
        { label: "Install / connect", value: "install / connect" },
      ],
    },
    tierBadge: {
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
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
    name: "Brightside",
    tier: "Platinum",
    tagline: "Enterprise Drupal and WordPress agency",
    about:
      "Brightside designs, builds, and runs high-traffic sites for media and retail brands. Pantheon Platinum partner since 2019.",
    capabilities: [
      { label: "Migrations" },
      { label: "Headless builds" },
      { label: "Performance audits" },
      { label: "Managed support" },
    ],
    certs: [{ label: "Pantheon Certified Partner" }, { label: "Drupal Certified" }],
    stats: [
      { value: "140+", label: "Sites launched" },
      { value: "6", label: "Years with Pantheon" },
      { value: "4.9", label: "Average rating" },
    ],
    primary: "Contact partner",
    secondary: "View case studies",
    primaryHref: "",
    secondaryHref: "",
    connectTitle: "Connect to Pantheon",
    steps: [{ label: "Authorize access" }, { label: "Choose sites" }, { label: "Start syncing" }],
    permissions: [{ label: "Read site metadata" }, { label: "Trigger deploys" }],
    connectNote: "Not connected · takes under a minute",
    layout: "header + sidebar",
    tierBadge: "on",
    tone: "light",
    width: "contained",
  },
  render: PartnerDetailRender,
};

export const meta = defineMeta({
  title: "Partner detail",
  description:
    "Partner profile page with logo, tier badge, about text, capabilities, certifications and stats, plus an install and connect layout with editable steps and permissions; use for a single partner or integration page.",
  categories: ["listings"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-btn", "@p1/internal-icons", "@p1/internal-text"],
});
