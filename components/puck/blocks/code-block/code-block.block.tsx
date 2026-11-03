import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { CodeBlockRender, type CodeBlockProps, type CodeBlockTab } from "./code-block";
export type { CodeBlockProps, CodeBlockTab };

const toggle = {
  type: "radio" as const,
  options: [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ],
};

export const CodeBlockBlock: ComponentConfig<CodeBlockProps> = {
  fields: {
    tabs: {
      type: "array" as const,
      max: 8,
      arrayFields: {
        lang: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Tab label, usually the language or tool. 1–2 words. E.g. Terminus, Composer, JavaScript." },
        },
        code: {
          type: "textarea" as const,
          ai: { instructions: "The code for this tab. Plain text, one statement per line, 2–8 lines." },
        },
      },
      defaultItemProps: { lang: "Shell", code: "echo hello" },
      getItemSummary: (item: CodeBlockTab) => item.lang || "Tab",
    },
    filename: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "File name shown in the header. E.g. deploy.sh. Leave blank to hide." },
    },
    highlight: {
      type: "text" as const,
      ai: { instructions: "Line numbers to highlight, comma separated; a range like 4-6 is allowed. E.g. 2,4-6. Leave blank for none." },
    },
    lineNumbers: { ...toggle },
    output: { ...toggle },
    outputText: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Sample command output shown under the code. One short line." },
    },
    theme: {
      type: "radio" as const,
      options: [
        { label: "Dark", value: "dark" },
        { label: "Light", value: "light" },
      ],
    },
  },
  defaultProps: {
    tabs: [
      {
        lang: "Terminus",
        code: "terminus env:create my-site dev feature-hero\nterminus multidev:merge-to-dev my-site feature-hero\nterminus env:deploy my-site.test",
      },
      { lang: "Composer", code: "composer require pantheon-systems/quicksilver-pushback\ncomposer install" },
    ],
    filename: "deploy.sh",
    highlight: "2",
    lineNumbers: "on",
    output: "on",
    outputText: "✔ Merged feature-hero into dev in 42s",
    theme: "dark",
  },
  render: CodeBlockRender,
};

export const meta = defineMeta({
  title: "Code Block",
  description: "Code snippet with optional language tabs, filename, line numbers, highlighted lines and sample output; use for docs and developer pages.",
  categories: ["content"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section", "@p1/internal-text"],
});
