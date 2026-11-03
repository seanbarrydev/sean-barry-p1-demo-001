import { Section } from "@/lib/section";
import { Btn, TextLink } from "@/lib/btn";
import { Icon } from "@/lib/icons";
import "./topic-rail.css";

export interface Topic {
  label: string;
  count: string;
}

export interface TopicRailProps {
  topics: Topic[];
  layout: "chip row" | "sidebar list" | "tag cloud" | "mega filter";
  counts: "off" | "on";
  search: "off" | "on";
  sort: "Newest" | "Popular" | "A–Z";
  tone: "light" | "gray";
  width: "contained" | "full bleed";
}

// Extra filter columns shown in the mega filter layout.
const MEGA_COLUMNS: [string, [string, string][]][] = [
  ["Format", [["Article", "64"], ["Guide", "28"], ["Case study", "13"], ["Video", "23"]]],
  ["Audience", [["Developers", "71"], ["Marketers", "34"], ["Agencies", "23"]]],
];

export function TopicRailRender({ topics, layout = "chip row", counts, search, sort, tone, width }: TopicRailProps) {
  const list = topics || [];
  const showCounts = counts === "on";
  const searchBox =
    search === "on" ? (
      <span className="p1-topic-rail__search">
        <Icon name="search" />
        Search topics
      </span>
    ) : null;

  const column = (heading: string, rows: [string, string][], first: boolean) => (
    <div key={heading} className="p1-topic-rail__col">
      <p className="p1-topic-rail__over">{heading}</p>
      {rows.map(([label, count], i) => (
        <div key={i} className="p1-topic-rail__check">
          <span className="p1-topic-rail__box" data-checked={first && i === 0 ? "true" : undefined} aria-hidden="true" />
          <span className="p1-topic-rail__check-label">{label}</span>
          {showCounts && <span className="p1-topic-rail__count">{count}</span>}
        </div>
      ))}
    </div>
  );

  let body;
  if (layout === "mega filter") {
    body = (
      <div className="p1-topic-rail__panel">
        {searchBox}
        <div className="p1-topic-rail__cols">
          {column("Topic", list.map((t) => [t.label, t.count] as [string, string]), true)}
          {MEGA_COLUMNS.map(([h, rows]) => column(h, rows, false))}
        </div>
        <div className="p1-topic-rail__actions">
          <TextLink>Clear all</TextLink>
          <Btn variant="dark">Show 128 results</Btn>
        </div>
      </div>
    );
  } else if (layout === "sidebar list") {
    body = (
      <div className="p1-topic-rail__side">
        {searchBox}
        <ul className="p1-topic-rail__list">
          {list.map((t, i) => (
            <li key={i} className="p1-topic-rail__row" data-first={i === 0 ? "true" : undefined}>
              <span>{t.label}</span>
              {showCounts && <span className="p1-topic-rail__count">{t.count}</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    body = (
      <div className="p1-topic-rail__row-wrap">
        {searchBox}
        {list.map((t, i) =>
          layout === "tag cloud" ? (
            <span key={i} className="p1-topic-rail__tag" data-step={i % 3}>{t.label}</span>
          ) : (
            <span key={i} className="p1-topic-rail__chip" data-active={i === 0 ? "true" : undefined}>
              {t.label}
              {showCounts && <span className="p1-topic-rail__chip-count">{t.count}</span>}
            </span>
          ),
        )}
        <span className="p1-topic-rail__sort">Sort: {sort}</span>
      </div>
    );
  }

  return (
    <Section tone={tone} width={width} className="p1-topic-rail">
      <div data-layout={layout.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}>{body}</div>
    </Section>
  );
}
