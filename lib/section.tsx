import type { ReactNode } from "react";
import "./section.css";

/**
 * Shared section chrome (background tone, width, padding, heading group)
 * for blocks that do not need their own. Shared utility — not a Puck block.
 */
export type SectionTone = "light" | "gray" | "dark";
export type SectionWidth = "contained" | "full bleed";

export function Section({
  tone = "light",
  width = "contained",
  className,
  children,
}: {
  tone?: SectionTone;
  width?: SectionWidth;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={["p1-sec", className].filter(Boolean).join(" ")} data-tone={tone} data-width={width}>
      <div className="p1-sec__inner">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  heading,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  if (!eyebrow && !heading && !subtitle) return null;
  return (
    <header className="p1-sec-head" data-align={align}>
      {eyebrow ? <p className="p1-sec-head__eyebrow">{eyebrow}</p> : null}
      {heading ? <h2 className="p1-sec-head__title">{heading}</h2> : null}
      {subtitle ? <p className="p1-sec-head__sub">{subtitle}</p> : null}
    </header>
  );
}
