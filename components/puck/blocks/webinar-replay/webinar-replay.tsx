import { useId } from "react";
import { Section, type SectionTone, type SectionWidth } from "@/lib/section";
import { Btn, TextLink } from "@/lib/btn";
import { Icon } from "@/lib/icons";
import { distinct, textOf } from "@/lib/text";
import "./webinar-replay.css";

export interface WebinarChapter {
  time: string;
  title: string;
}
export interface WebinarTranscriptLine {
  text: string;
}
export interface WebinarDownload {
  label: string;
}
export interface WebinarLibraryItem {
  title: string;
  speaker: string;
  length: string;
  tag: string;
}
export interface WebinarReplayProps {
  title: string;
  chapters: WebinarChapter[];
  transcript: WebinarTranscriptLine[];
  speaker: string;
  role: string;
  downloads: WebinarDownload[];
  library: WebinarLibraryItem[];
  layout: "player + chapters" | "player + transcript" | "gated replay" | "on-demand library";
  speakerCard: "off" | "on";
  downloadsOn: "off" | "on";
  upNext: "off" | "on";
  nextTitle: string;
  nextHref?: string;
  tone: SectionTone;
  width: SectionWidth;
}

function Poster({ label }: { label: string }) {
  return (
    <div className="p1-webinar__poster" role="img" aria-label={label}>
      <span className="p1-webinar__play" aria-hidden="true" />
    </div>
  );
}

export function WebinarReplayRender({
  title,
  chapters,
  transcript,
  speaker,
  role,
  downloads,
  library,
  layout = "player + chapters",
  speakerCard,
  downloadsOn,
  upNext,
  nextTitle,
  nextHref,
  tone = "light",
  width = "contained",
}: WebinarReplayProps) {
  const uid = useId();
  const slug = layout.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const chapterList = chapters || [];
  const lines = transcript || [];
  const files = downloads || [];
  const tiles = library || [];
  // The filter chips are the distinct tags of the library, in the order they first appear.
  const filters = ["All", ...distinct(tiles.map((t) => t.tag))];
  const showSpeaker = speakerCard === "on" && (speaker || role);
  const showDownloads = downloadsOn === "on" && files.length > 0;

  const head = title ? <h1 className="p1-webinar__title">{title}</h1> : null;

  if (layout === "on-demand library") {
    return (
      <Section tone={tone} width={width} className="p1-webinar">
        <div data-layout={slug}>
          <div className="p1-webinar__bar">
            {head}
            <div className="p1-webinar__filters">
              {filters.map((f, i) => (
                <span key={i} className="p1-sec-pill p1-webinar__filter" data-active={i === 0 ? "true" : undefined}>
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="p1-sec-grid">
            {tiles.map((t, i) => (
              <article key={i} className="p1-sec-card p1-webinar__tile">
                <div className="p1-webinar__tile-art">
                  <Poster label={textOf(t.title)} />
                  <span className="p1-webinar__duration">{t.length}</span>
                </div>
                <div className="p1-webinar__tile-body">
                  {t.tag && <span className="p1-sec-pill">{t.tag}</span>}
                  <h2 className="p1-webinar__tile-title">{t.title}</h2>
                  <p className="p1-webinar__muted">{t.speaker}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  const gated = layout === "gated replay";
  const tabName = `${uid}-tab`;
  const chaptersFirst = layout !== "player + transcript";

  const side = (
    <div className="p1-webinar__side">
      <input
        className="p1-webinar__tab-input"
        type="radio"
        name={tabName}
        id={`${uid}-chapters`}
        defaultChecked={chaptersFirst}
      />
      <input
        className="p1-webinar__tab-input"
        type="radio"
        name={tabName}
        id={`${uid}-transcript`}
        defaultChecked={!chaptersFirst}
      />
      <div className="p1-webinar__tabs">
        <label htmlFor={`${uid}-chapters`} className="p1-webinar__tab" data-tab="chapters">
          Chapters
        </label>
        <label htmlFor={`${uid}-transcript`} className="p1-webinar__tab" data-tab="transcript">
          Transcript
        </label>
      </div>
      <ol className="p1-webinar__panel p1-webinar__chapters" data-panel="chapters">
        {chapterList.map((c, i) => (
          <li key={i} className="p1-webinar__chapter" data-current={i === 0 ? "true" : undefined}>
            <span className="p1-webinar__time">{c.time}</span>
            <span>{c.title}</span>
          </li>
        ))}
      </ol>
      <div className="p1-webinar__panel p1-sec-card" data-panel="transcript">
        {lines.map((l, i) => (
          <p key={i} className="p1-webinar__para">
            {l.text}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <Section tone={tone} width={width} className="p1-webinar">
      <div data-layout={slug}>
        {head}
        {gated ? (
          <div className="p1-webinar__gate">
            <div className="p1-webinar__locked">
              <Poster label={textOf(title) || "Replay"} />
              <div className="p1-webinar__blur" aria-hidden="true" />
            </div>
            <div className="p1-sec-card p1-webinar__form">
              <h2 className="p1-webinar__tile-title">Watch the full replay</h2>
              {/* A picture of a form: nothing submits, so the field stays out of the accessibility tree. */}
              <div className="p1-webinar__field" aria-hidden="true">
                <span>Work email</span>
                <div className="p1-webinar__input" />
              </div>
              <Btn>Unlock replay</Btn>
            </div>
          </div>
        ) : (
          <div className="p1-webinar__main">
            <Poster label={textOf(title) || "Replay"} />
            {side}
          </div>
        )}
        {showSpeaker || showDownloads ? (
          <div className="p1-webinar__meta">
            {showSpeaker ? (
              <div className="p1-sec-card p1-webinar__speaker">
                <span className="p1-webinar__initials" aria-hidden="true">
                  {textOf(speaker).trim().charAt(0).toUpperCase() || "?"}
                </span>
                <div>
                  <p className="p1-webinar__name">{speaker}</p>
                  <p className="p1-webinar__muted">{role}</p>
                </div>
              </div>
            ) : null}
            {showDownloads ? (
              <div className="p1-sec-card">
                <p className="p1-webinar__over">Downloads</p>
                <ul className="p1-webinar__downloads">
                  {files.map((f, i) => (
                    <li key={i} className="p1-webinar__download">
                      <Icon name="arrow-up" className="p1-webinar__download-icon" />
                      {f.label}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
        {upNext === "on" ? (
          <div className="p1-webinar__next">
            <span>
              <span className="p1-webinar__muted">Up next · </span>{nextTitle}
            </span>
            {nextHref && <TextLink href={nextHref}>Register</TextLink>}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
