import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { P1_ASSETS } from '@/lib/assets';
import { TeamGridRender, type TeamGridProps, type TeamMember } from "./team-grid";
export type { TeamGridProps, TeamMember };

export const TeamGridBlock: ComponentConfig<TeamGridProps> = {
  fields: {
    eyebrow: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Short label above the heading. 2–4 words. E.g. The team." },
    },
    heading: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Section heading. 4–8 words." },
    },
    columns: {
      type: "select" as const,
      label: "Columns (not in photo cards, with filter, leadership row)",
      options: [
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ],
    },
    shape: {
      type: "radio" as const,
      options: [
        { label: "Circle", value: "circle" },
        { label: "Rounded", value: "rounded" },
        { label: "Square", value: "square" },
      ],
    },
    tone: {
      type: "radio" as const,
      options: [
        { label: "White", value: "white" },
        { label: "Light", value: "light" },
      ],
    },
    members: {
      type: "array" as const,
      arrayFields: {
        name: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Team member's full name." },
        },
        role: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Job title. E.g. Head of Operations." },
        },
        avatar: {
          type: "text" as const,
          ai: { exclude: true },
        },
        bio: {
          type: "text" as const,
          contentEditable: true,
          ai: { instructions: "1–2 sentence bio. Optional — leave blank to omit." },
        },
        team: {
          type: "text" as const,
          ai: { instructions: "Team or department name, e.g. Design. Used for the filter chips in the with filter layout. Optional." },
        },
      },
      defaultItemProps: { name: "Team member", role: "Role", avatar: "", bio: "", team: "" },
      getItemSummary: (item: TeamMember) => item.name || "Member",
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Grid (follows Columns)", value: "grid 4-col" },
        { label: "Photo cards", value: "photo cards" },
        { label: "With filter (display only)", value: "with filter" },
        { label: "Leadership row (first 3 only)", value: "leadership row" },
      ],
      ai: { instructions: "Grid 4-col follows the columns field. Photo cards and with filter use 4 columns; leadership row shows the first 3 people in cards. With filter shows one static chip per team." },
    },
    social: {
      label: "Social icons (display only)",
      type: "radio" as const,
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
      ai: { instructions: "Show decorative link and email icons under each person." },
    },
  },
  defaultProps: {
    eyebrow: "The team",
    heading: "People behind the platform.",
    columns: "3",
    shape: "circle",
    tone: "white",
    members: [
      { name: "Jordan Ellis", role: "Head of Operations", avatar: P1_ASSETS.AVATAR, bio: "", team: "Operations" },
      { name: "Sam Rivera", role: "Principal Engineer", avatar: P1_ASSETS.AVATAR, bio: "", team: "Engineering" },
      { name: "Priya Nair", role: "Design Lead", avatar: P1_ASSETS.AVATAR, bio: "", team: "Design" },
    ],
    layout: "grid 4-col",
    social: "off",
  },
  render: TeamGridRender,
};

export const meta = defineMeta({
  title: 'Team Grid',
  description: 'Grid of team member cards with avatar, name, role, and bio in a circle, rounded or square photo shape, as a grid, photo cards, filter chips or a leadership row; use for About/Team pages.',
  categories: ["trust"],
  published: true,
  registryDependencies: ["@p1/tokens","@p1/internal-img","@p1/internal-icons","@p1/internal-text"],
});
