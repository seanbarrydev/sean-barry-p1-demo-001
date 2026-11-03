import { RichValue } from "@/lib/rich";
import { Section } from "@/lib/section";
import { Icon } from "@/lib/icons";
import { FallbackImg } from "@/lib/img";
import "./article-body.css";

export interface ArticleBodyProps {
  lead: string;
  heading: string;
  body: string;
  pull: string;
  caption: string;
  image: string;
  code: string;
  width: "narrow" | "wide";
  toc: { label: string }[];
  sidebar: "none" | "TOC" | "share";
  dropCap: "off" | "on";
  font: "sans" | "serif";
  tone: "light" | "gray";
}

export function ArticleBodyRender({ lead, heading, body, pull, caption, image, code, toc, width, sidebar, dropCap, font, tone }: ArticleBodyProps) {
  return (
    <Section tone={tone}>
      <div className="p1-article-body" data-width={width} data-sidebar={sidebar} data-font={font} data-dropcap={dropCap}>
        <div className="p1-article-body__main">
          <div className="p1-article-body__lead">
            <RichValue value={lead} />
          </div>
          {heading && <h2 className="p1-article-body__heading">{heading}</h2>}
          <RichValue value={body} />
          {image || caption ? (
            <figure className="p1-article-body__figure">
              {image ? (
                <FallbackImg src={image} alt="" className="p1-article-body__figure-art" />
              ) : (
                <div className="p1-article-body__figure-art" aria-hidden="true" />
              )}
              {caption ? <figcaption className="p1-article-body__caption">{caption}</figcaption> : null}
            </figure>
          ) : null}
          {pull ? <blockquote className="p1-article-body__pull">{pull}</blockquote> : null}
          {code ? (
            <pre className="p1-article-body__code">
              <code>{code}</code>
            </pre>
          ) : null}
        </div>
        {sidebar !== "none" ? (
          <aside className="p1-article-body__side">
            <p className="p1-article-body__side-title">{sidebar === "TOC" ? "On this page" : "Share"}</p>
            {sidebar === "TOC" ? (
              <ul className="p1-article-body__toc">
                {(toc || []).filter((t) => t.label).map((t, i) => (
                  <li key={i}>{t.label}</li>
                ))}
              </ul>
            ) : (
              <div className="p1-article-body__share">
                <Icon name="link" />
                <Icon name="mail" />
                <Icon name="external" />
              </div>
            )}
          </aside>
        ) : null}
      </div>
    </Section>
  );
}
