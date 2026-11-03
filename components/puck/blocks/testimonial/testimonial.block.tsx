import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from '@/lib/define-meta';
import { P1_ASSETS } from '@/lib/assets';
import { TestimonialRender, type TestimonialProps, type TestimonialItem } from "./testimonial";
export type { TestimonialProps, TestimonialItem };

const toggle = [
  { label: "Off", value: "off" },
  { label: "On", value: "on" },
];

export const TestimonialBlock: ComponentConfig<TestimonialProps> = {
  fields: {
    quote: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "A genuine-sounding customer quote, 15–35 words. First person." },
    },
    name: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Customer's full name." },
    },
    role: {
      type: "text" as const,
      contentEditable: true,
      visible: false,
      ai: { instructions: "Job title and company. E.g. Operations Lead, Acme Corp." },
    },
    avatarSrc: {
      type: "text" as const,
      ai: { exclude: true },
    },
    layout: {
      type: "select" as const,
      options: [
        { label: "Centered", value: "centered" },
        { label: "Card", value: "card" },
        { label: "Large", value: "large" },
        { label: "3-up grid", value: "3-up grid" },
        { label: "With image", value: "with image" },
        { label: "Carousel", value: "carousel" },
      ],
    },
    tone: {
      type: "select" as const,
      options: [
        { label: "Light", value: "light" },
        { label: "White", value: "white" },
        { label: "Accent", value: "accent" },
        { label: "Dark", value: "dark" },
      ],
    },
    items: {
      label: "Quotes (3-up grid shows the first 3)",
      type: "array" as const,
      arrayFields: {
        quote: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "A genuine-sounding customer quote, 15–35 words. First person." },
        },
        name: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Customer's full name." },
        },
        role: {
          type: "text" as const,
          contentEditable: true,
          visible: false,
          ai: { instructions: "Job title, then company after a comma. E.g. VP Digital, Northwind." },
        },
        rating: {
          type: "text" as const,
          ai: { instructions: "Star rating from 0 to 5. E.g. 5." },
        },
        avatarSrc: {
          type: "text" as const,
          label: "Photo URL",
          ai: { exclude: true },
        },
      },
      defaultItemProps: { quote: "A short customer quote.", name: "Customer name", role: "Title, Company", rating: "5" },
      getItemSummary: (item: TestimonialItem) => item.name || "Quote",
      ai: { instructions: "Quotes for the 3-up grid and carousel layouts; the other layouts show the first one. When empty, the single quote, name and role fields are shown instead." },
    },
    avatar: { type: "radio" as const, options: toggle },
    logo: { type: "radio" as const, options: toggle },
    rating: { type: "radio" as const, options: toggle },
    mark: {
      type: "radio" as const,
      options: [
        { label: "None", value: "none" },
        { label: "Sans", value: "sans" },
        { label: "Serif", value: "serif" },
      ],
    },
  },
  defaultProps: {
    quote: "The team was up and running in a day, and we haven't looked back. It just works.",
    name: "Jordan Ellis",
    role: "Operations Lead",
    avatarSrc: P1_ASSETS.AVATAR,
    layout: "centered",
    tone: "light",
    items: [],
    avatar: "on",
    logo: "off",
    rating: "off",
    mark: "sans",
  },
  render: TestimonialRender,
};

export const meta = defineMeta({
  title: 'Testimonial',
  description: 'Customer testimonial with quote text, name, role, and avatar in centered, card, large, 3-up grid, with image and carousel layouts and multiple tones; use for social proof.',
  categories: ["trust"],
  published: true,
  registryDependencies: ["@p1/tokens","@p1/internal-img"],
});
