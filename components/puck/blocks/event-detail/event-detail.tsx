import { P1_FALLBACKS } from "@/lib/assets";
import { FallbackImg } from "@/lib/img";
import { Btn, TextLink } from "@/lib/btn";
import { Icon } from "@/lib/icons";
import "./event-detail.css";

export interface EventDetailProps {
  image: string;
  format: string;
  title: string;
  subtitle: string;
  date: string;
  where: string;
  btn: string;
  btnHref?: string;
  replayHref?: string;
  chapters: { label: string }[];
  layout: "split + form" | "countdown hero" | "cover bleed" | "inline replay";
  state: "upcoming" | "live" | "ended";
  countdown: "off" | "on";
  addCal: "off" | "on";
  tone: "light" | "dark";
}

// Sample figures: the block cannot count down to the date, so the countdown is off by default.
const COUNTDOWN = [
  ["12", "days"],
  ["04", "hrs"],
  ["37", "min"],
];
const FORM_FIELDS = ["Full name", "Work email"];

export function EventDetailRender({
  image,
  format,
  title,
  subtitle,
  date,
  where,
  btn,
  btnHref,
  replayHref,
  chapters,
  layout = "split + form",
  state = "upcoming",
  countdown = "off",
  addCal = "on",
  tone = "light",
}: EventDetailProps) {
  const cover = layout === "cover bleed";
  const split = layout === "split + form";
  const replay = layout === "inline replay";
  const st = replay ? "ended" : state;
  const effectiveTone = cover ? "dark" : tone;
  const btnVariant = effectiveTone === "dark" ? "yellow" : "primary";
  const chapterList = (chapters || []).filter((c) => c.label);
  const btnLabel = st === "ended" ? "Watch replay" : btn;
  // An ended event points at the replay, never back at the registration page.
  const actionHref = st === "ended" ? replayHref : btnHref;

  const text = (
    <div className="p1-event-detail__text">
      <div className="p1-event-detail__tags">
        {format && <span className="p1-event-detail__pill" data-solid="">{format}</span>}
        {st === "live" && (
          <span className="p1-event-detail__pill">
            <span className="p1-event-detail__dot" />
            Live now
          </span>
        )}
        {st === "ended" && <span className="p1-event-detail__pill">Ended</span>}
      </div>
      <h1 className="p1-event-detail__title">{title}</h1>
      {subtitle && <p className="p1-event-detail__sub">{subtitle}</p>}
      <div className="p1-event-detail__meta">
        {date && (
          <span>
            <Icon name="calendar" />
            {date}
          </span>
        )}
        {where && (
          <span>
            <Icon name="globe" />
            {where}
          </span>
        )}
      </div>
      {countdown === "on" && st === "upcoming" && (
        <div className="p1-event-detail__count">
          {COUNTDOWN.map(([n, l]) => (
            <div key={l} className="p1-event-detail__unit">
              <div className="p1-event-detail__num">{n}</div>
              <div className="p1-event-detail__unit-label">{l}</div>
            </div>
          ))}
        </div>
      )}
      {!split && !replay && (
        <div className="p1-event-detail__actions">
          <Btn variant={btnVariant} href={actionHref}>{btnLabel}</Btn>
          {addCal === "on" && st !== "ended" && (
            <TextLink className="p1-event-detail__link">Add to calendar</TextLink>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section
      className="p1-event-detail"
      data-tone={effectiveTone}
      data-layout={layout.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}
    >
      {cover && (
        <FallbackImg
          className="p1-event-detail__bg"
          src={image}
          loading="eager"
          fallback={P1_FALLBACKS.LANDSCAPE}
          alt=""
        />
      )}
      <div className="p1-event-detail__inner">
        {split ? (
          <div className="p1-event-detail__split">
            {text}
            <div className="p1-event-detail__form">
              <h2 className="p1-event-detail__form-title">Register</h2>
              {/* The fields are a static picture of a form; only the button is a real action. */}
              {FORM_FIELDS.map((f) => (
                <div key={f} className="p1-event-detail__field" aria-hidden="true">{f}</div>
              ))}
              <Btn variant={btnVariant} href={actionHref}>{btnLabel}</Btn>
            </div>
          </div>
        ) : (
          text
        )}
        {replay && (
          <>
            <div className="p1-event-detail__player" aria-hidden="true">
              <span className="p1-event-detail__play" />
            </div>
            {chapterList.length > 0 && (
              <ul className="p1-event-detail__chapters">
                {chapterList.map((c, i) => (
                  <li key={i} className="p1-event-detail__pill" data-solid={i === 0 ? "" : undefined}>{c.label}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}
