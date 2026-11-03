import { Section, SectionHead } from "@/lib/section";
import "./challenge-result.css";

export interface ChallengeStep {
  label: string;
  title: string;
  text: string;
  metric: string;
}
export interface ChallengeResultProps {
  eyebrow: string;
  heading: string;
  steps: ChallengeStep[];
  layout?: "3-column" | "stacked" | "timeline";
  metrics?: "off" | "on";
  highlight?: "off" | "on";
  tone?: "light" | "gray" | "dark";
  width?: "contained" | "full bleed";
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function ChallengeResultRender({
  eyebrow,
  heading,
  steps,
  layout = "3-column",
  metrics = "on",
  highlight = "on",
  tone = "light",
  width = "contained",
}: ChallengeResultProps) {
  const list = steps || [];
  return (
    <Section tone={tone} width={width} className="p1-challenge-result p1-block">
      <div className="p1-challenge-result__root" data-layout={slug(layout)}>
        <SectionHead eyebrow={eyebrow} heading={heading} align="left" />
        <div className="p1-challenge-result__list" style={{ "--cols": list.length || 3 } as React.CSSProperties}>
          {list.map((s, i) => (
            <div
              key={i}
              className="p1-challenge-result__item"
              data-hot={highlight === "on" && i === list.length - 1 ? "true" : undefined}
            >
              <div className="p1-challenge-result__label">
                {layout === "timeline" ? `${String(i + 1).padStart(2, "0")} · ` : ""}
                {s.label}
              </div>
              <h3 className="p1-challenge-result__title">{s.title}</h3>
              <p className="p1-challenge-result__text">{s.text}</p>
              {metrics === "on" && s.metric && <div className="p1-challenge-result__metric">{s.metric}</div>}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
