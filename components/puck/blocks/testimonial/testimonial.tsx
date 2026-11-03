import { P1_FALLBACKS } from '@/lib/assets';
import { FallbackImg } from '@/lib/img';
import "./testimonial.css";

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  rating: string;
  avatarSrc?: string;
}

export interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
  layout: "centered" | "card" | "large" | "3-up grid" | "with image" | "carousel";
  tone: "light" | "white" | "accent" | "dark";
  items: TestimonialItem[];
  avatar: "off" | "on";
  logo: "off" | "on";
  rating: "off" | "on";
  mark: "none" | "sans" | "serif";
}

const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Quote({ item, p, card }: { item: Partial<TestimonialItem>; p: TestimonialProps; card: boolean }) {
  // Only a missing or unreadable rating falls back to 5; a rating of 0 stays 0.
  const rated = item.rating === undefined || item.rating === "" ? NaN : Number(item.rating);
  const stars = Math.min(5, Math.max(0, Math.round(Number.isNaN(rated) ? 5 : rated)));
  // In the editor an inline-editable field arrives as an element, not a string.
  const company = typeof item.role === "string" ? item.role.split(", ")[1] : undefined;
  const alt = typeof item.name === "string" ? item.name : "";
  // Cards each show their own photo; the block-level one would put every name under one face.
  const avatarSrc = item.avatarSrc || (card ? P1_FALLBACKS.AVATAR : p.avatarSrc);
  const body = (
    <>
      {p.mark !== "none" && <div className="p1-testimonial__mark" data-mark={p.mark} aria-hidden="true">&ldquo;</div>}
      {p.rating === "on" && (
        <div className="p1-testimonial__stars" role="img" aria-label={`${stars} out of 5`}>
          {"★".repeat(stars)}{"☆".repeat(5 - stars)}
        </div>
      )}
      <p className="p1-testimonial__quote">{item.quote}</p>
    </>
  );
  const who = (
    <div className="p1-testimonial__attribution">
      {p.avatar === "on" && (
        <div className="p1-testimonial__avatar">
          {avatarSrc && <FallbackImg src={avatarSrc} fallback={P1_FALLBACKS.AVATAR} alt={alt} className="p1-testimonial__avatar-img" />}
        </div>
      )}
      <div className="p1-testimonial__byline">
        <div className="p1-testimonial__name">{item.name}</div>
        <div className="p1-testimonial__role">{item.role}</div>
      </div>
      {p.logo === "on" && company && <span className="p1-testimonial__logo">{company}</span>}
    </div>
  );
  return card ? (
    <figure className="p1-testimonial__card">
      <div className="p1-testimonial__card-body">{body}</div>
      {who}
    </figure>
  ) : (
    <>
      {body}
      {who}
    </>
  );
}

export function TestimonialRender(props: TestimonialProps) {
  const { quote, name, role, layout = "centered", tone, items = [] } = props;
  // Puck sends null for an emptied list, which a destructuring default does not catch.
  const list: Partial<TestimonialItem>[] = items?.length ? items : [{ quote, name, role }];
  const multi = layout === "3-up grid" || layout === "carousel";
  const props2 = { ...props, avatar: props.avatar ?? "on", logo: props.logo ?? "off", rating: props.rating ?? "off", mark: props.mark ?? "sans" };
  return (
    <div className="p1-testimonial p1-block" data-layout={slug(layout)} data-tone={tone}>
      {multi ? (
        <div className="p1-testimonial__list" tabIndex={layout === "carousel" ? 0 : undefined} aria-label={layout === "carousel" ? "Testimonials" : undefined}>
          {(layout === "3-up grid" ? list.slice(0, 3) : list).map((it, i) => (
            <Quote key={i} item={it} p={props2} card />
          ))}
        </div>
      ) : (
        <div className="p1-testimonial__inner">
          {layout === "with image" && (
            <div className="p1-testimonial__portrait">
              {props.avatarSrc && <FallbackImg src={props.avatarSrc} fallback={P1_FALLBACKS.AVATAR} alt="" className="p1-testimonial__portrait-img" />}
            </div>
          )}
          <div className="p1-testimonial__single">
            <Quote item={list[0] ?? {}} p={props2} card={false} />
          </div>
        </div>
      )}
    </div>
  );
}
