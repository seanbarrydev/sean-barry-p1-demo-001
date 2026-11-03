import type { CSSProperties } from "react";
import { Section, SectionHead } from "@/lib/section";
import { Icon } from "@/lib/icons";
import { P1_FALLBACKS } from "@/lib/assets";
import { FallbackImg } from "@/lib/img";
import { distinct, dotJoin, textOf } from "@/lib/text";
import "./event-calendar.css";

export interface CalendarEvent {
  title: string;
  date: string;
  day: string;
  mon: string;
  time: string;
  format: string;
  where: string;
  speakers: string;
  left: string;
}

export interface EventCalendarProps {
  eyebrow: string;
  heading: string;
  events: CalendarEvent[];
  view: "month grid" | "week strip" | "agenda" | "map view";
  month: string;
  mapImage?: string;
  chips: "off" | "on";
  filter: "off" | "on";
  ics: "off" | "on";
  tone: "light" | "gray";
  width: "contained" | "full bleed";
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** "October 2026" or "Oct 2026" to year and zero-based month; null if it is anything else. */
function parseMonth(text: string) {
  const m = /^\s*([a-z]{3})[a-z]*\.?\s+(\d{4})\s*$/i.exec(text);
  if (!m) return null;
  const idx = MONTHS.indexOf((m[1] ?? "").toLowerCase());
  return idx >= 0 ? { year: Number(m[2]), month: idx } : null;
}

const monthKey = (e: CalendarEvent) => textOf(e.mon).slice(0, 3).toLowerCase();

// An event with no year in its date is placed by month alone.
const yearOf = (e: CalendarEvent) => /\b(\d{4})\b/.exec(textOf(e.date))?.[1];

/** True when the event falls on this day of this month and year. */
function onDay(e: CalendarEvent, year: number, month: number, day: number) {
  const y = yearOf(e);
  return Number(textOf(e.day)) === day && monthKey(e) === MONTHS[month] && (y === undefined || Number(y) === year);
}

function Row({ e }: { e: CalendarEvent }) {
  return (
    <li className="p1-event-calendar__row">
      <div className="p1-event-calendar__date">
        <span className="p1-event-calendar__date-mon">{e.mon}</span>
        <span className="p1-event-calendar__date-day">{e.day}</span>
      </div>
      <div className="p1-event-calendar__row-body">
        <h3 className="p1-event-calendar__row-title">{e.title}</h3>
        <p className="p1-event-calendar__row-meta">{dotJoin([e.time, e.where])}</p>
      </div>
      {e.format && <span className="p1-sec-pill">{e.format}</span>}
    </li>
  );
}

function MonthGrid({ year, month, events, chips }: { year: number; month: number; events: CalendarEvent[]; chips: boolean }) {
  const lead = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const total = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((lead + total) / 7) * 7 }, (_, i) => i - lead + 1);
  return (
    <div className="p1-event-calendar__grid">
      {WEEKDAYS.map((d) => (
        <div key={d} className="p1-event-calendar__weekday">{d}</div>
      ))}
      {cells.map((d, i) =>
        d < 1 || d > total ? (
          <div key={i} className="p1-event-calendar__cell" data-blank="" />
        ) : (
          <div key={i} className="p1-event-calendar__cell">
            <span className="p1-event-calendar__num">{d}</span>
            {chips &&
              events
                .filter((e) => onDay(e, year, month, d))
                .map((e, j) => (
                  <span key={j} className="p1-event-calendar__chip" title={textOf(e.title)}>{e.title}</span>
                ))}
          </div>
        ),
      )}
    </div>
  );
}

function WeekStrip({ year, month, events }: { year: number; month: number; events: CalendarEvent[] }) {
  // Show the Monday-to-Sunday week that holds the first event, or the first week.
  const first = events.find((e) => onDay(e, year, month, Number(textOf(e.day))) && Number(textOf(e.day)) > 0);
  const anchor = first ? Number(textOf(first.day)) : 1;
  const start = anchor - ((new Date(Date.UTC(year, month, anchor)).getUTCDay() + 6) % 7);
  return (
    <div className="p1-event-calendar__week">
      {Array.from({ length: 7 }, (_, i) => {
        const date = new Date(Date.UTC(year, month, start + i));
        const day = date.getUTCDate();
        const es = events.filter((e) => onDay(e, date.getUTCFullYear(), date.getUTCMonth(), day));
        return (
          <div key={i} className="p1-event-calendar__week-day">
            <div className="p1-event-calendar__week-label">
              {WEEKDAYS[date.getUTCDay()]} <strong>{day}</strong>
            </div>
            {es.map((e, j) => (
              <div key={j} className="p1-event-calendar__week-event">
                {e.title}
                <span className="p1-event-calendar__week-time">{e.time}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// The pins only sketch the idea on the placeholder; over a real map they would point at the wrong places.
function MapView({ events, image }: { events: CalendarEvent[]; image?: string }) {
  return (
    <div className="p1-event-calendar__map-wrap">
      <div className="p1-event-calendar__map">
        <FallbackImg src={image} fallback={P1_FALLBACKS.LANDSCAPE} alt="" className="p1-event-calendar__map-img" />
        {!image &&
          events.map((_, i) => (
          <span
            key={i}
            className="p1-event-calendar__pin"
            aria-hidden="true"
            style={{ "--x": `${16 + ((i * 21) % 70)}%`, "--y": `${24 + ((i * 37) % 48)}%` } as CSSProperties}
          >
            <span>{i + 1}</span>
          </span>
        ))}
      </div>
      <ol className="p1-event-calendar__list">
        {events.map((e, i) => (
          <li key={i} className="p1-event-calendar__row">
            <span className="p1-event-calendar__num-badge">{i + 1}</span>
            <div className="p1-event-calendar__row-body">
              <h3 className="p1-event-calendar__row-title">{e.title}</h3>
              <p className="p1-event-calendar__row-meta">{dotJoin([e.date, e.where])}</p>
            </div>
            {e.format && <span className="p1-sec-pill">{e.format}</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function EventCalendarRender(props: EventCalendarProps) {
  const { eyebrow, heading, view = "month grid", month, chips, filter, ics, tone, width } = props;
  // Puck sends null for an emptied list, which a destructuring default does not catch.
  const events = props.events || [];
  const parsed = parseMonth(textOf(month));
  // Grid and week views need a real month; without one the agenda is the safe layout.
  const layout = !parsed && (view === "month grid" || view === "week strip") ? "agenda" : view;
  return (
    <div className="p1-event-calendar p1-block" data-layout={slug(layout)}>
      <Section tone={tone === "gray" ? "gray" : "light"} width={width}>
        <SectionHead eyebrow={eyebrow} heading={heading} align="left" />
        <div className="p1-event-calendar__bar">
          <div className="p1-event-calendar__month">
            <Icon name="chevron-left" className="p1-event-calendar__nav" />
            <span>{month}</span>
            <Icon name="chevron-right" className="p1-event-calendar__nav" />
          </div>
          <div className="p1-event-calendar__tools">
            {filter === "on" &&
              ["All", ...distinct(events.map((e) => e.format))].map((f, i) => (
                <span key={i} className="p1-sec-pill p1-event-calendar__filter" data-active={i === 0 ? "" : undefined}>{f}</span>
              ))}
            {ics === "on" && (
              <span className="p1-sec-pill">
                <Icon name="calendar" className="p1-event-calendar__tool-icon" />
                Subscribe
              </span>
            )}
          </div>
        </div>
        {layout === "map view" ? (
          <MapView events={events} image={props.mapImage} />
        ) : parsed && layout === "month grid" ? (
          <MonthGrid {...parsed} events={events} chips={chips === "on"} />
        ) : parsed && layout === "week strip" ? (
          <WeekStrip {...parsed} events={events} />
        ) : (
          <ul className="p1-event-calendar__list">
            {events.map((e, i) => (
              <Row key={i} e={e} />
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}
