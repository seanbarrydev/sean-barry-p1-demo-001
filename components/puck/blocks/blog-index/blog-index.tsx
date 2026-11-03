import { Section, SectionHead } from "@/lib/section";
import { FallbackImg } from "@/lib/img";
import { P1_FALLBACKS } from "@/lib/assets";
import "./blog-index.css";

type Toggle = "off" | "on";
export interface BlogIndexPost {
  image: string;
  title: string;
  category: string;
  excerpt: string;
  meta: string;
}
export interface BlogIndexProps {
  eyebrow: string;
  heading: string;
  posts: BlogIndexPost[];
  layout?: "card grid" | "editorial list" | "featured + grid" | "magazine";
  cover?: Toggle;
  excerpt?: Toggle;
  category?: Toggle;
  meta?: Toggle;
  pagination?: "numbered" | "load more" | "none";
  tone?: "light" | "gray";
  width?: "contained" | "full bleed";
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function BlogIndexRender({
  eyebrow,
  heading,
  posts,
  layout = "card grid",
  cover = "on",
  excerpt = "on",
  category = "on",
  meta = "on",
  pagination = "numbered",
  tone = "light",
  width = "contained",
}: BlogIndexProps) {
  const list = posts || [];
  return (
    <Section tone={tone} width={width} className="p1-blog-index p1-block">
      <div className="p1-blog-index__root" data-layout={slug(layout)}>
        <SectionHead eyebrow={eyebrow} heading={heading} align="left" />
        <div className="p1-blog-index__posts">
          {list.map((post, i) => (
            <article key={i} className="p1-blog-index__post" data-lead={i === 0 || undefined}>
              {cover === "on" && (
                <div className="p1-blog-index__cover">
                  <FallbackImg src={post.image} fallback={P1_FALLBACKS.LANDSCAPE} alt="" className="p1-blog-index__img" />
                </div>
              )}
              <div className="p1-blog-index__body">
                {category === "on" && post.category && <p className="p1-blog-index__category">{post.category}</p>}
                <h3 className="p1-blog-index__title">{post.title}</h3>
                {excerpt === "on" && post.excerpt && <p className="p1-blog-index__excerpt">{post.excerpt}</p>}
                {meta === "on" && post.meta && <p className="p1-blog-index__meta">{post.meta}</p>}
              </div>
            </article>
          ))}
        </div>
        {pagination !== "none" && (
          <div className="p1-blog-index__pager">
            {pagination === "numbered" ? (
              [1, 2, 3].map((n) => (
                <span key={n} className="p1-blog-index__page" data-current={n === 1 || undefined}>{n}</span>
              ))
            ) : (
              <span className="p1-blog-index__more">Load more</span>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
