import { Icon, type IconName } from "@/lib/icons";
import { TextLink } from "@/lib/btn";
import { FallbackImg } from "@/lib/img";
import "./features.css";

export const FEATURE_ICONS: IconName[] = ["rocket", "shield", "globe", "branch", "sparkle", "layers", "clock", "chat", "data", "page"];

export interface FeatureCard {
  eyebrow: string;
  title: string;
  body: string;
  icon?: string;
  link?: string;
  image?: string;
  linkHref?: string;
}
export interface FeatureCardsProps {
  subtitle: string;
  heading: string;
  cards: FeatureCard[];
  columns: "2" | "3" | "4";
  colorScheme: "brand mix" | "light" | "purple" | "dark" | "outline";
  corners: "sharp" | "soft" | "round";
  depth: "flat" | "subtle" | "raised";
  cardAlign: "left" | "center";
  sectionBg: "light" | "white" | "dark" | "none";
  layout?: "grid" | "alternating";
  icons?: "none" | "line" | "filled";
  links?: "off" | "on";
}

function cardScheme(colorScheme: FeatureCardsProps["colorScheme"], i: number): string {
  if (colorScheme === "brand mix") {
    const cycle: string[] = ["primary", "light", "dark"];
    return cycle[i % 3] ?? "light";
  }
  if (colorScheme === "purple") return "primary";
  return colorScheme;
}

export function FeatureCardsRender({
  subtitle,
  heading,
  cards,
  columns,
  colorScheme,
  corners,
  depth,
  cardAlign,
  sectionBg,
  layout = "grid",
  icons = "none",
  links = "off",
}: FeatureCardsProps) {
  const list = cards || [];
  const cols = Math.min(Number(columns) || 3, list.length || 1);
  const alternating = layout === "alternating";

  const content = (c: FeatureCard) => (
    <>
      {icons !== "none" && FEATURE_ICONS.includes(c.icon as IconName) && (
        <span className="p1-feature-cards__icon" data-icons={icons}>
          <Icon name={c.icon as IconName} />
        </span>
      )}
      {c.eyebrow && <div className="p1-feature-cards__eyebrow">{c.eyebrow}</div>}
      <h3 className="p1-feature-cards__card-title">{c.title}</h3>
      <p className="p1-feature-cards__card-body">{c.body}</p>
      {links === "on" && c.link && (
        <TextLink href={c.linkHref} className="p1-feature-cards__link">
          {c.link}
          <Icon name="arrow-right" />
        </TextLink>
      )}
    </>
  );

  return (
    <div
      className="p1-feature-cards p1-block"
      data-bg={sectionBg}
      data-align={cardAlign}
      data-layout={alternating ? "alternating" : "grid"}
    >
      <div className="p1-feature-cards__inner">
        {(subtitle || heading) && (
          <div className="p1-feature-cards__header">
            {subtitle && <p className="p1-feature-cards__subtitle" data-bg={sectionBg}>{subtitle}</p>}
            {heading && <h2 className="p1-feature-cards__heading">{heading}</h2>}
          </div>
        )}
        {alternating ? (
          <div className="p1-feature-cards__rows">
            {list.slice(0, 3).map((c, i) => (
              <div key={i} className="p1-feature-cards__row">
                <div className="p1-feature-cards__row-text">{content(c)}</div>
                <FallbackImg className="p1-feature-cards__row-img" src={c.image} alt="" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p1-feature-cards__grid" style={{ "--cols": cols } as React.CSSProperties}>
            {list.map((c, i) => (
              <div
                key={i}
                className="p1-feature-cards__card"
                data-scheme={cardScheme(colorScheme, i)}
                data-corners={corners}
                data-depth={depth}
              >
                {content(c)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
