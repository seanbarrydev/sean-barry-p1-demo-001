import { Section, type SectionTone, type SectionWidth } from "@/lib/section";
import { FallbackImg } from "@/lib/img";
import { textOf } from "@/lib/text";
import "./author-related.css";

export interface RelatedPost {
  image: string;
  title: string;
  category: string;
  meta: string;
}

export interface AuthorRelatedProps {
  author: string;
  bio: string;
  authorBlock: "off" | "on";
  related: "grid" | "list" | "none";
  posts: RelatedPost[];
  newsletter: "off" | "on";
  tone: SectionTone;
  width: SectionWidth;
}

const initials = (name: unknown) =>
  textOf(name).split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("");

export function AuthorRelatedRender({
  author,
  bio,
  authorBlock,
  related,
  posts,
  newsletter,
  tone,
  width,
}: AuthorRelatedProps) {
  const list = posts || [];
  return (
    <Section tone={tone} width={width} className="p1-author-related">
      <div className="p1-author-related__root" data-layout={related}>
        {authorBlock === "on" && (
          <div className="p1-author-related__card">
            <span className="p1-author-related__avatar" aria-hidden="true">{initials(author || "")}</span>
            <div>
              <div className="p1-author-related__name">{author}</div>
              <p className="p1-author-related__bio">{bio}</p>
            </div>
          </div>
        )}
        {related !== "none" && (
          <div className="p1-author-related__related">
            <h3 className="p1-author-related__heading">Keep reading</h3>
            {related === "grid" ? (
              <div className="p1-author-related__grid">
                {list.map((x, i) => (
                  <div key={i} className="p1-author-related__post">
                    <FallbackImg src={x.image} alt="" className="p1-author-related__img" />
                    <div className="p1-author-related__category">{x.category}</div>
                    <h4 className="p1-author-related__title">{x.title}</h4>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p1-author-related__list">
                {list.map((x, i) => (
                  <div key={i} className="p1-author-related__row">
                    <span className="p1-author-related__title">{x.title}</span>
                    <span className="p1-author-related__meta">{x.meta}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {newsletter === "on" && (
          <div className="p1-author-related__newsletter" aria-hidden="true">
            <div className="p1-author-related__newsletter-title">One good read a week.</div>
            <div className="p1-author-related__form">
              <span className="p1-author-related__input">you@company.com</span>
              <span className="p1-author-related__submit">Subscribe</span>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
