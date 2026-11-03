import { Section, SectionHead } from "@/lib/section";
import { Icon } from "@/lib/icons";
import { distinct, textOf } from "@/lib/text";
import "./marketplace.css";

export interface MarketplacePartner {
  name: string;
  tier: string;
  type: string;
  text: string;
  rating: string;
  solution: string;
}

export interface MarketplaceProps {
  eyebrow: string;
  heading: string;
  partners: MarketplacePartner[];
  layout: "tile grid" | "sidebar filter + grid" | "featured + grid" | "by solution";
  density: "comfortable" | "compact";
  search: "off" | "on";
  tiers: "off" | "on";
  reviews: "off" | "on";
  tone: "light" | "gray";
  width: "contained" | "full bleed";
}

// In the editor an inline-editable value arrives as an element, not a string.
const slug = (v: unknown) =>
  typeof v === "string" ? v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "";

function Tier({ tier }: { tier: string }) {
  return (
    <span className="p1-marketplace__tier" data-tier={slug(textOf(tier))}>
      {tier}
    </span>
  );
}

// The search box and filter checks are display only; nothing filters the list.
function Search() {
  return (
    <span className="p1-marketplace__search">
      <Icon name="search" />
      Search partners
    </span>
  );
}

export function MarketplaceRender({
  eyebrow,
  heading,
  partners,
  layout = "sidebar filter + grid",
  density = "comfortable",
  search = "on",
  tiers = "on",
  reviews = "on",
  tone = "light",
  width = "contained",
}: MarketplaceProps) {
  const list = partners || [];

  const tile = (x: MarketplacePartner, i: number) => (
    <li key={i} className="p1-marketplace__tile">
      <div className="p1-marketplace__tile-top">
        <span className="p1-marketplace__logo" aria-hidden="true">{textOf(x.name).charAt(0) || "?"}</span>
        {tiers === "on" && x.tier && <Tier tier={x.tier} />}
      </div>
      <h3 className="p1-marketplace__name">{x.name}</h3>
      {density !== "compact" && x.text && <p className="p1-marketplace__text">{x.text}</p>}
      <div className="p1-marketplace__foot">
        <span>{x.type}</span>
        {reviews === "on" && x.rating && <span className="p1-marketplace__rating">★ {x.rating}</span>}
      </div>
    </li>
  );
  const grid = (items: [MarketplacePartner, number][]) => (
    <ul className="p1-marketplace__grid">{items.map(([x, i]) => tile(x, i))}</ul>
  );
  const all = list.map((x, i) => [x, i] as [MarketplacePartner, number]);

  let body;
  if (layout === "by solution") {
    const solutions = [...new Set(list.map((x) => textOf(x.solution) || "Other"))];
    body = (
      <div className="p1-marketplace__groups">
        {solutions.map((sol) => {
          const items = all.filter(([x]) => (textOf(x.solution) || "Other") === sol);
          return (
            <div key={sol}>
              <div className="p1-marketplace__group-head">
                <h3 className="p1-marketplace__group-title">
                  {sol} <span className="p1-marketplace__count">{items.length}</span>
                </h3>
                <span className="p1-marketplace__link">View all</span>
              </div>
              {grid(items)}
            </div>
          );
        })}
      </div>
    );
  } else if (layout === "sidebar filter + grid") {
    body = (
      <div className="p1-marketplace__split">
        <div className="p1-marketplace__filters">
          {search === "on" && <Search />}
          {([["Type", distinct(list.map((x) => x.type))], ["Tier", distinct(list.map((x) => x.tier))]] as [string, string[]][]).map(([h, opts]) => (
            <div key={h}>
              <p className="p1-marketplace__filter-title">{h}</p>
              {opts.map((o, i) => (
                <div key={i} className="p1-marketplace__check">
                  <span className="p1-marketplace__box" aria-hidden="true" />
                  {o}
                </div>
              ))}
            </div>
          ))}
        </div>
        {grid(all)}
      </div>
    );
  } else {
    const featured = layout === "featured + grid" ? list[0] : undefined;
    body = (
      <>
        {layout === "tile grid" && search === "on" && (
          <div className="p1-marketplace__bar">
            <Search />
          </div>
        )}
        {featured && (
          <div className="p1-marketplace__featured">
            <div className="p1-marketplace__featured-art" aria-hidden="true">{textOf(featured.name).charAt(0) || "?"}</div>
            <div className="p1-marketplace__featured-body">
              {tiers === "on" && featured.tier && <Tier tier={featured.tier} />}
              <h3 className="p1-marketplace__featured-title">{featured.name}</h3>
              <p className="p1-marketplace__text">{featured.text}</p>
            </div>
          </div>
        )}
        {grid(featured ? all.slice(1) : all)}
      </>
    );
  }

  return (
    <Section tone={tone} width={width} className="p1-marketplace">
      <div className="p1-marketplace__root" data-layout={slug(layout)} data-density={density}>
        <SectionHead eyebrow={eyebrow} heading={heading} align="left" />
        {body}
      </div>
    </Section>
  );
}
