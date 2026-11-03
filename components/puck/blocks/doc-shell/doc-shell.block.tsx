import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { DocShellRender, type DocShellProps, type DocShellItem } from "./doc-shell";
export type { DocShellProps, DocShellItem };

const toggle = {
  type: "radio" as const,
  options: [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ],
};

const labelList = (what: string, instructions: string) => ({
  type: "array" as const,
  arrayFields: {
    // Plain field: a leading ## makes a group heading, so the label must stay a string.
    label: { type: "text" as const, ai: { instructions } },
  },
  defaultItemProps: { label: what },
  getItemSummary: (item: DocShellItem) => item.label || what,
});

export const DocShellBlock: ComponentConfig<DocShellProps> = {
  fields: {
    title: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Documentation page title. Under 8 words. E.g. Create a Multidev environment." },
    },
    intro: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "One or two sentences introducing the page, shown under the title." },
    },
    nav: { ...labelList("Page", "Sidebar entry. Start with ## to make it a group heading, otherwise it is a page link. Short, 1-4 words."), label: "Navigation (not in top nav)" },
    current: {
      label: "Current page (navigation link to highlight)",
      type: "text" as const,
      ai: { instructions: "Label of the navigation link for the page being read. Must match a link exactly; it is highlighted and ends the breadcrumb." },
    },
    topNav: { ...labelList("Link", "Top bar link. One word."), label: "Top links (top nav only)" },
    toc: labelList("Section", "Heading on this page, shown in the on-this-page list and as the first section titles. Short."),
    layout: {
      type: "select" as const,
      options: [
        { label: "Three pane", value: "three pane" },
        { label: "Sidebar only", value: "sidebar only" },
        { label: "Top nav", value: "top nav" },
        { label: "Mobile drawer", value: "mobile drawer" },
      ],
    },
    search: toggle,
    breadcrumb: toggle,
    edit: toggle,
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
    title: "Create a Multidev environment",
    intro: "Multidev gives every branch its own full environment, database and files included.",
    nav: [
      "## Getting started", "Overview", "Install Terminus",
      "## Workflow", "Create a Multidev", "Merge changes", "Delete an environment",
      "## Reference", "Terminus commands",
    ].map((label) => ({ label })),
    current: "Create a Multidev",
    topNav: ["Guides", "API", "Terminus", "Changelog"].map((label) => ({ label })),
    toc: ["Before you begin", "Create from the dashboard", "Create with Terminus", "Next steps"].map((label) => ({ label })),
    layout: "three pane",
    search: "on",
    breadcrumb: "on",
    edit: "on",
    tone: "light",
    width: "contained",
  },
  render: DocShellRender,
};

export const meta = defineMeta({
  title: 'Doc Shell',
  description: 'Documentation page layout with a sidebar, page title, intro, on-this-page list and optional search, breadcrumb and edit link; the page body is a placeholder, so use it to lay out a docs site; use for docs and guides.',
  categories: ["listings"],
  published: true,
  registryDependencies: ["@p1/tokens","@p1/internal-icons"],
});
