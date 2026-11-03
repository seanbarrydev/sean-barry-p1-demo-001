import { TextLink } from "@/lib/btn";
import { FallbackImg } from "@/lib/img";
import "./logos.css";

export interface LogoItem {
  src: string;
  label: string;
  href?: string;
  target?: "_self" | "_blank";
}
export interface LogoCloudProps {
  heading: string;
  style: "mono" | "color";
  height: "small" | "medium" | "large";
  logos: LogoItem[];
  layout?: "single row" | "two rows" | "marquee" | "grid 4×2";
  align?: "left" | "center";
  linked?: "off" | "on";
}

const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Logo({ l, hidden, linked }: { l: LogoItem; hidden?: boolean; linked?: boolean }) {
  // The repeated marquee copy is hidden from assistive tech, so its links must not take focus.
  const rest = hidden ? { "aria-hidden": true as const, ...(linked && l.href ? { tabIndex: -1 } : {}) } : {};
  const href = linked ? l.href : undefined;
  return l.src ? (
    <TextLink className="p1-logo-cloud__item" href={href} target={l.target} {...rest}>
      <FallbackImg src={l.src} alt="" className="p1-logo-cloud__img" />
      {l.label && <span className="p1-logo-cloud__label">{l.label}</span>}
    </TextLink>
  ) : (
    <TextLink className="p1-logo-cloud__placeholder" href={href} target={l.target} {...rest}>{l.label || "Logo"}</TextLink>
  );
}

export function LogoCloudRender({ heading, style, height, logos, layout = "single row", align = "center", linked = "off" }: LogoCloudProps) {
  const all = logos || [];
  const isLinked = linked === "on";
  const items = layout === "grid 4×2" ? all.slice(0, 8) : all;
  return (
    <div
      className="p1-logo-cloud p1-block"
      data-style={style}
      data-height={height}
      data-layout={slug(layout)}
      data-align={align}
      data-linked={linked}
    >
      <div className="p1-logo-cloud__inner">
        {heading && <div className="p1-logo-cloud__heading">{heading}</div>}
        <div className="p1-logo-cloud__list">
          {layout === "marquee" ? (
            <div className="p1-logo-cloud__track">
              {items.map((l, i) => <Logo key={i} l={l} linked={isLinked} />)}
              {items.map((l, i) => <Logo key={`copy-${i}`} l={l} linked={isLinked} hidden />)}
            </div>
          ) : (
            items.map((l, i) => (layout === "grid 4×2" ? <div key={i} className="p1-logo-cloud__cell"><Logo l={l} linked={isLinked} /></div> : <Logo key={i} l={l} linked={isLinked} />))
          )}
        </div>
      </div>
    </div>
  );
}
