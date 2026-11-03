import type { ComponentConfig } from "@puckeditor/core";
import { defineMeta } from "@/lib/define-meta";
import { ContactFormRender, type ContactFormProps, type ContactFormLabel } from "./contact-form";
export type { ContactFormProps, ContactFormLabel };

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
const labelItem = (instructions: string) => ({
  type: "array" as const,
  // Plain field: the label picks the input kind and the list key, so it must stay a string.
  arrayFields: { label: { type: "text" as const, ai: { instructions } } },
  defaultItemProps: { label: "Label" },
  getItemSummary: (item: ContactFormLabel) => item.label || "Item",
});

export const ContactFormBlock: ComponentConfig<ContactFormProps> = {
  fields: {
    eyebrow: text("Short label above the heading. 1–3 words. E.g. Contact."),
    heading: text("Section heading. Under 8 words. E.g. Talk to our team."),
    subtitle: text("One or two sentences under the heading, setting a reply-time expectation."),
    fields: { ...labelItem("Form field label. E.g. Full name, Work email, Company. A label containing Message becomes a multi-line box."), label: "Fields (not in inline single)" },
    reasons: { ...labelItem("A reason the visitor can pick. E.g. Sales, Support."), label: "Reasons (not in inline single)" },
    reason: toggle,
    reasonLabel: { ...text("Label of the reason picker. E.g. Reason."), label: "Reason label (not in inline single)" },
    consent: toggle,
    consentText: { ...text("Wording of the consent checkbox. One sentence."), label: "Consent text (not in inline single)" },
    step1: { ...text("Title of the first stepper step. 2–3 words."), label: "Step one title (stepper only)" },
    step2: { ...text("Title of the second stepper step. 2–3 words."), label: "Step two title (stepper only)" },
    btn: text("Button label. 2–3 words. E.g. Send message."),
    layout: {
      type: "select" as const,
      options: [
        { label: "Stacked", value: "stacked" },
        { label: "2-col + textarea", value: "2-col + textarea" },
        { label: "Inline single", value: "inline single" },
        { label: "Stepper", value: "stepper" },
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
      type: "select" as const,
      options: [
        { label: "Contained", value: "contained" },
        { label: "Full bleed", value: "full bleed" },
      ],
    },
  },
  defaultProps: {
    eyebrow: "Contact",
    heading: "Talk to our team",
    subtitle: "Tell us about your project. We reply within one business day.",
    fields: [{ label: "Full name" }, { label: "Work email" }, { label: "Company" }, { label: "Message" }],
    reasons: [{ label: "Sales" }, { label: "Support" }, { label: "Partnerships" }, { label: "Press" }],
    reason: "on",
    reasonLabel: "Reason",
    consent: "on",
    consentText: "I agree to be contacted about my request.",
    step1: "Your details",
    step2: "Your project",
    btn: "Send message",
    layout: "2-col + textarea",
    tone: "light",
    width: "contained",
  },
  render: ContactFormRender,
};

export const meta = defineMeta({
  title: "Contact Form",
  description: "Labelled contact form with configurable fields, optional reason picker and consent checkbox, in stacked, two column, inline or stepper layouts; layout only, the Send button does not submit, so wire it to your own handler before publishing.",
  categories: ["convert"],
  published: true,
  registryDependencies: ["@p1/tokens", "@p1/internal-section"],
});
