import { Section } from "@/lib/section";
import { Btn } from "@/lib/btn";
import { Icon } from "@/lib/icons";
import "./post-event.css";

type Target = "_self" | "_blank";

export interface PostEventProps {
  heading: string;
  subtitle: string;
  primary: string;
  primaryHref?: string;
  primaryTarget?: Target;
  secondary: string;
  secondaryHref?: string;
  secondaryTarget?: Target;
  layout: "thank-you" | "watch + next event" | "sales handoff" | "email-style";
  nextEvent: "off" | "on";
  nextTitle: string;
  nextMonth: string;
  nextDay: string;
  nextDetail: string;
  rsvpHref?: string;
  rsvpTarget?: Target;
  share: "off" | "on";
  calendar: "off" | "on";
  calendarHref?: string;
  calendarTarget?: Target;
  tone: "light" | "gray";
  width: "contained" | "full bleed";
}

const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function PostEventRender(p: PostEventProps) {
  const { layout = "watch + next event" } = p;
  const handoff = layout === "sales handoff";
  const lead = handoff ? { label: p.secondary, href: p.secondaryHref, target: p.secondaryTarget } : { label: p.primary, href: p.primaryHref, target: p.primaryTarget };
  const alt = handoff ? { label: p.primary, href: p.primaryHref, target: p.primaryTarget } : { label: "Add to calendar", href: p.calendarHref, target: p.calendarTarget };
  const showAlt = handoff ? !!alt.label : p.calendar === "on";

  const main = (
    <div className="p1-post-event__main">
      <span className="p1-post-event__check"><Icon name="check" /></span>
      {p.heading && <h2 className="p1-post-event__title">{p.heading}</h2>}
      {p.subtitle && <p className="p1-post-event__sub">{p.subtitle}</p>}
      {(lead.label || showAlt) && (
        <div className="p1-post-event__actions">
          {lead.label && <Btn variant="primary" href={lead.href} target={lead.target}>{lead.label}</Btn>}
          {showAlt && <Btn variant="secondary" href={alt.href} target={alt.target}>{alt.label}</Btn>}
        </div>
      )}
      {p.share === "on" && <p className="p1-post-event__share">Know someone who’d like this? Share the replay.</p>}
    </div>
  );

  const next = p.nextEvent === "on" && layout !== "thank-you" && (
    <div className="p1-post-event__next">
      <p className="p1-post-event__over">Next event</p>
      <div className="p1-post-event__next-row">
        <div className="p1-post-event__date">
          <span className="p1-post-event__mon">{p.nextMonth}</span>
          <span className="p1-post-event__day">{p.nextDay}</span>
        </div>
        <div>
          <p className="p1-post-event__next-title">{p.nextTitle}</p>
          <p className="p1-post-event__next-detail">{p.nextDetail}</p>
        </div>
      </div>
      <div className="p1-post-event__rsvp"><Btn variant="primary" href={p.rsvpHref} target={p.rsvpTarget}>RSVP</Btn></div>
    </div>
  );

  const body =
    layout === "email-style" ? (
      <div className="p1-post-event__mail">
        <div className="p1-post-event__mail-head">
          <div><b>From</b> Events team</div>
          <div><b>Subject</b> {p.heading}</div>
        </div>
        <div className="p1-post-event__mail-body">
          {main}
          {next && <div className="p1-post-event__mail-next">{next}</div>}
        </div>
      </div>
    ) : next ? (
      <div className="p1-post-event__split">{main}{next}</div>
    ) : (
      main
    );

  return (
    <Section tone={p.tone} width={p.width} className="p1-post-event">
      <div className="p1-post-event__root" data-layout={slug(layout)}>{body}</div>
    </Section>
  );
}
