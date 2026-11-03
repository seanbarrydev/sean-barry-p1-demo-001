import { Section, type SectionTone, type SectionWidth } from "@/lib/section";
import { Btn } from "@/lib/btn";
import { FallbackImg } from "@/lib/img";
import { textOf } from "@/lib/text";
import "./featured-post.css";

export interface FeaturedPostNext {
  category: string;
  title: string;
}

export interface FeaturedPostProps {
  image: string;
  category: string;
  title: string;
  dek: string;
  author: string;
  meta: string;
  buttonLabel: string;
  buttonHref?: string;
  buttonTarget?: "_self" | "_blank";
  layout: "split cover" | "full-bleed image" | "hero + 2 next" | "centered editorial";
  imagePos: "right" | "left";
  nextPosts: FeaturedPostNext[];
  tone: SectionTone;
  width: SectionWidth;
}

const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function FeaturedPostRender({
  image,
  category,
  title,
  dek,
  author,
  meta,
  buttonLabel,
  buttonHref,
  buttonTarget,
  layout = "split cover",
  imagePos,
  nextPosts = [],
  tone,
  width,
}: FeaturedPostProps) {
  const fullBleed = layout === "full-bleed image";
  const effectiveTone: SectionTone = fullBleed ? "dark" : tone;

  const text = (
    <div className="p1-featured-post__text">
      {category && <span className="p1-featured-post__pill">{category}</span>}
      <h1 className="p1-featured-post__title">{title}</h1>
      {dek && <p className="p1-featured-post__dek">{dek}</p>}
      {(author || meta) && (
        <p className="p1-featured-post__byline">
          {author}
          {textOf(author) && textOf(meta) ? " · " : null}
          {meta}
        </p>
      )}
      {buttonLabel && (
        <Btn variant={effectiveTone === "dark" ? "yellow" : "primary"} href={buttonHref} target={buttonTarget}>
          {buttonLabel}
        </Btn>
      )}
    </div>
  );
  const cover = (
    <div className="p1-featured-post__cover">
      <FallbackImg src={image} loading="eager" alt="" className="p1-featured-post__cover-img" />
    </div>
  );
  // Puck sends null for an emptied list, which a destructuring default does not catch.
  const next = (nextPosts || []).filter((n) => n.title || n.category);

  return (
    <Section
      tone={effectiveTone}
      width={width}
      className="p1-featured-post p1-block"
    >
      <div className="p1-featured-post__root" data-layout={slug(layout)} data-image-pos={imagePos}>
        {fullBleed && <FallbackImg src={image} loading="eager" alt="" className="p1-featured-post__backdrop" />}
        {layout === "hero + 2 next" ? (
          <div className="p1-featured-post__grid">
            {text}
            <div className="p1-featured-post__next">
              {next.map((n, i) => (
                <div key={i} className="p1-featured-post__next-item">
                  {n.category && <div className="p1-featured-post__next-cat">{n.category}</div>}
                  <div className="p1-featured-post__next-title">{n.title}</div>
                </div>
              ))}
            </div>
          </div>
        ) : layout === "split cover" ? (
          <div className="p1-featured-post__grid">
            {text}
            {cover}
          </div>
        ) : (
          text
        )}
      </div>
    </Section>
  );
}
