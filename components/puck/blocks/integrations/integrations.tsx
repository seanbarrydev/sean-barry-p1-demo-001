import { Section, SectionHead } from "@/lib/section";
import { Icon } from "@/lib/icons";
import { textOf } from "@/lib/text";
import "./integrations.css";

export interface IntegrationItem {
  name: string;
  category: string;
}
export interface IntegrationsProps {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: IntegrationItem[];
  layout?: "grid" | "with filters" | "logo cluster";
  search?: "off" | "on";
  categories?: "off" | "on";
  cols?: "4" | "5" | "6";
  tone?: "light" | "gray" | "dark";
  width?: "contained" | "full bleed";
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function IntegrationsRender({
  eyebrow,
  heading,
  subtitle,
  items,
  layout = "with filters",
  search = "on",
  categories = "on",
  cols = "5",
  tone = "light",
  width = "contained",
}: IntegrationsProps) {
  const list = items || [];
  const cats = [...new Set(["All", ...list.map((i) => textOf(i.category)).filter(Boolean)])];
  const showSearch = search === "on";
  const showCats = categories === "on";
  const filters = layout === "with filters" && (showSearch || showCats);
  return (
    <Section tone={tone} width={width} className="p1-integrations p1-block">
      <div className="p1-integrations__root" data-layout={slug(layout)} style={{ "--cols": Number(cols) || 5 } as React.CSSProperties}>
        <SectionHead eyebrow={eyebrow} heading={heading} subtitle={subtitle} />
        {filters && (
          <div className="p1-integrations__filters">
            {showSearch && (
              <span className="p1-integrations__search">
                <Icon name="search" />
                Search integrations
              </span>
            )}
            {showCats &&
              cats.map((c, i) => (
                <span key={c} className="p1-sec-pill p1-integrations__chip" data-active={i === 0 ? "true" : undefined}>
                  {c}
                </span>
              ))}
          </div>
        )}
        {layout === "logo cluster" ? (
          <ul className="p1-integrations__cluster">
            {list.map((it, i) => (
              <li key={i} className="p1-integrations__logo">{it.name}</li>
            ))}
          </ul>
        ) : (
          <ul className="p1-sec-grid p1-integrations__grid">
            {list.map((it, i) => (
              <li key={i} className="p1-sec-card p1-integrations__card">
                <span className="p1-integrations__mark" aria-hidden="true">{textOf(it.name).charAt(0) || "?"}</span>
                <span className="p1-integrations__name">{it.name}</span>
                <span className="p1-integrations__cat">{it.category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
