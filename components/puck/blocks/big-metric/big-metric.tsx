import { Section, type SectionTone, type SectionWidth } from "@/lib/section";
import "./big-metric.css";

export interface BigMetric {
  value: string;
  label: string;
}
export interface BigMetricProps {
  metrics: BigMetric[];
  quote: string;
  who: string;
  mode: "single metric" | "metric trio" | "pull quote" | "metric + quote";
  attribution: "off" | "on";
  tone: SectionTone;
  width: SectionWidth;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Metric({ m }: { m: Partial<BigMetric> }) {
  return (
    <div className="p1-big-metric__metric">
      <div className="p1-big-metric__value">{m.value}</div>
      <div className="p1-big-metric__label">{m.label}</div>
    </div>
  );
}

export function BigMetricRender({
  metrics,
  quote,
  who,
  mode = "metric + quote",
  attribution = "on",
  tone = "dark",
  width = "contained",
}: BigMetricProps) {
  const list = metrics || [];
  const q = (
    <figure className="p1-big-metric__quote">
      <blockquote>{quote ? <>“{quote}”</> : null}</blockquote>
      {attribution === "on" && who ? <figcaption>{who}</figcaption> : null}
    </figure>
  );
  return (
    <div className="p1-big-metric" data-layout={slug(mode)}>
      <Section tone={tone} width={width}>
        {mode === "single metric" ? (
          <Metric m={list[0] || {}} />
        ) : mode === "metric trio" ? (
          <div className="p1-big-metric__trio">
            {list.slice(0, 3).map((m, i) => (
              <Metric key={i} m={m} />
            ))}
          </div>
        ) : mode === "pull quote" ? (
          q
        ) : (
          <div className="p1-big-metric__split">
            <Metric m={list[0] || {}} />
            {q}
          </div>
        )}
      </Section>
    </div>
  );
}
