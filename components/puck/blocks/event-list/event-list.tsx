import { Btn, TextLink } from "@/lib/btn";
import { Section, SectionHead, type SectionTone, type SectionWidth } from "@/lib/section";
import { wireframe } from "@/lib/define-meta";
import { FallbackImg } from "@/lib/img";
import { distinct, dotJoin } from "@/lib/text";
import "./event-list.css";

export interface EventItem {
  title: string;
  date: string;
  day: string;
  mon: string;
  time: string;
  format: string;
  where: string;
  speakers: string;
  left: string;
  image?: string;
}

export interface EventListProps {
  eyebrow: string;
  heading: string;
  events: EventItem[];
  layout: "stacked rows" | "card grid" | "featured + queue" | "filter + list";
  dateBlock: "block" | "inline";
  format: "off" | "on";
  speakers: "off" | "on";
  capacity: "off" | "on";
  rsvp: "button" | "link";
  tone: SectionTone;
  width: SectionWidth;
}


const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function EventListRender({
  eyebrow,
  heading,
  events,
  layout = "stacked rows",
  dateBlock = "block",
  format = "on",
  speakers = "on",
  capacity = "on",
  rsvp = "button",
  tone = "light",
  width = "contained",
}: EventListProps) {
  const list = events || [];

  // Plain functions, not components: a component declared here is a new type on every render, so React would remount (and drop focus in) the inline-editable text inside.
  const rsvpButton = () =>
    rsvp === "link" ? (
      <TextLink className="p1-event-list__rsvp-link">RSVP</TextLink>
    ) : (
      <Btn variant="primary">RSVP</Btn>
    );

  const dateCell = ({ e }: { e: EventItem }) => (
    <div className="p1-event-list__date">
      <div className="p1-event-list__date-mon">{e.mon}</div>
      <div className="p1-event-list__date-day">{e.day}</div>
    </div>
  );

  const meta = (e: EventItem) =>
    dotJoin([dateBlock === "inline" ? e.date : "", e.time, e.where, speakers === "on" ? e.speakers : ""]);

  const tag = ({ e }: { e: EventItem }) =>
    format === "on" && e.format ? <span className="p1-sec-pill">{e.format}</span> : null;

  const left = ({ e }: { e: EventItem }) =>
    capacity === "on" && e.left ? <span className="p1-event-list__left">{e.left}</span> : null;

  const row = (e: EventItem, i: number) => (
    <li key={i} className="p1-event-list__row">
      {dateBlock === "block" && dateCell({ e })}
      <div className="p1-event-list__main">
        <div className="p1-event-list__titleline">
          <h3 className="p1-event-list__title">{e.title}</h3>
          {tag({ e })}
        </div>
        <p className="p1-event-list__meta">{meta(e)}</p>
      </div>
      {left({ e })}
      {rsvpButton()}
    </li>
  );

  const card = (e: EventItem, i: number) => (
    <li key={i} className="p1-sec-card p1-event-list__card">
      <div className="p1-event-list__card-top">
        {dateBlock === "block" ? dateCell({ e }) : <span className="p1-event-list__date-inline">{e.date}</span>}
        {tag({ e })}
      </div>
      <h3 className="p1-event-list__title">{e.title}</h3>
      <p className="p1-event-list__meta">{meta(e)}</p>
      <div className="p1-event-list__card-foot">
        {left({ e })}
        {rsvpButton()}
      </div>
    </li>
  );

  const featured = list[0];
  const filters: [string, string[]][] = [
    ["Format", ["All", ...distinct(list.map((e) => e.format))]],
    ["Location", ["Anywhere", ...distinct(list.map((e) => e.where))]],
  ];

  return (
    <Section tone={tone} width={width} className="p1-event-list p1-block">
      <div className="p1-event-list__root" data-layout={slug(layout)}>
        <SectionHead eyebrow={eyebrow} heading={heading} align="left" />
        {layout === "card grid" ? (
          <ul className="p1-event-list__grid">{list.map(card)}</ul>
        ) : layout === "featured + queue" ? (
          <div className="p1-event-list__split">
            {featured && (
              <div className="p1-sec-card p1-event-list__featured">
                <FallbackImg className="p1-event-list__art" src={featured.image} fallback={wireframe(640, 360)} alt="" />
                <div className="p1-event-list__featured-body">
                  <span className="p1-sec-pill p1-event-list__badge">Featured</span>
                  <h3 className="p1-event-list__title p1-event-list__title--lg">{featured.title}</h3>
                  <p className="p1-event-list__meta">{meta(featured)}</p>
                  <div className="p1-event-list__featured-cta">
                    {rsvpButton()}
                  </div>
                </div>
              </div>
            )}
            <ul className="p1-event-list__rows">
              {list.slice(1).map((e, i) => (
                <li key={i} className="p1-event-list__queue">
                  <div className="p1-event-list__title p1-event-list__title--sm">{e.title}</div>
                  <p className="p1-event-list__meta">{dotJoin([e.date, e.where])}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : layout === "filter + list" ? (
          <div className="p1-event-list__split p1-event-list__split--filter">
            <aside className="p1-event-list__filters" aria-label="Event filters">
              <span className="p1-event-list__search">Search events</span>
              {filters.map(([group, options]) => (
                <div key={group}>
                  <p className="p1-event-list__filter-head">{group}</p>
                  <ul className="p1-event-list__filter-list">
                    {options.map((o, i) => (
                      <li key={i} className="p1-event-list__filter-item" data-active={i === 0 ? "true" : undefined}>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>
            <ul className="p1-event-list__rows">{list.map(row)}</ul>
          </div>
        ) : (
          <ul className="p1-event-list__rows">{list.map(row)}</ul>
        )}
      </div>
    </Section>
  );
}
