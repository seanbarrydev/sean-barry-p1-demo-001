import { TextLink } from "@/lib/btn";
import "./stats.css";

export interface StatItem {
  value: string;
  label: string;
  caption?: string;
}
export interface StatsProps {
  tone: "light" | "dark";
  items: StatItem[];
  layout?: "row" | "on dark" | "single hero";
  numStyle?: "sans" | "serif";
  captionPos?: "below" | "above";
  source?: string;
  sourceHref?: string;
}

export function StatsRender({
  tone,
  items,
  layout = "row",
  numStyle = "sans",
  captionPos = "below",
  source,
  sourceHref,
}: StatsProps) {
  const hero = layout === "single hero";
  const list = hero ? (items || []).slice(0, 1) : items || [];
  const cols = Math.min(4, list.length || 1);
  // The "on dark" layout is dark by itself; saved tone values still apply.
  const effectiveTone = layout === "on dark" ? "dark" : tone;
  return (
    <div
      className="p1-stats p1-block"
      data-tone={effectiveTone}
      data-layout={layout.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}
      data-num-style={numStyle}
    >
      <div className="p1-stats__grid" style={{ "--p1-stats-cols": cols } as React.CSSProperties}>
        {list.map((it, i) => (
          <div key={i} className="p1-stats__item">
            {captionPos === "above" && <div className="p1-stats__label p1-stats__label--above">{it.label}</div>}
            <div className="p1-stats__value">{it.value}</div>
            {captionPos !== "above" && <div className="p1-stats__label">{it.label}</div>}
            {it.caption && <div className="p1-stats__caption">{it.caption}</div>}
          </div>
        ))}
      </div>
      {source && (
        <div className="p1-stats__source">
          <TextLink href={sourceHref} className="p1-stats__source-link">
            {source}
          </TextLink>
        </div>
      )}
    </div>
  );
}
