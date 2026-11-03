import { FallbackImg } from "@/lib/img";
import { Btn } from "@/lib/btn";
import { Section, type SectionTone, type SectionWidth } from "@/lib/section";
import "./case-hero.css";

export interface CaseHeroProps {
  imageSrc: string;
  customer: string;
  industry: string;
  heading: string;
  subtitle: string;
  stat: string;
  statLabel: string;
  buttonLabel: string;
  buttonHref?: string;
  buttonTarget?: "_self" | "_blank";
  layout: "split + photo" | "stat-first" | "magazine" | "logo bar above";
  tone: SectionTone;
  width: SectionWidth;
}

const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function CaseHeroRender({
  imageSrc,
  customer,
  industry,
  heading,
  subtitle,
  stat,
  statLabel,
  buttonLabel,
  buttonHref,
  buttonTarget,
  layout = "split + photo",
  tone = "light",
  width = "contained",
}: CaseHeroProps) {
  const dark = tone === "dark";
  const photo = (
    <div className="p1-case-hero__photo">
      <FallbackImg src={imageSrc} loading="eager" alt="" className="p1-case-hero__img" />
    </div>
  );
  const copy = (
    <div className="p1-case-hero__copy">
      {layout === "logo bar above" ? (
        customer && <div className="p1-case-hero__wordmark">{customer}</div>
      ) : (
        <div className="p1-case-hero__pills">
          <span className="p1-case-hero__pill" data-solid="true">Case study</span>
          {industry && <span className="p1-case-hero__pill">{industry}</span>}
        </div>
      )}
      {layout === "stat-first" && stat && (
        <div className="p1-case-hero__stat">
          {stat}
          {statLabel && <div className="p1-case-hero__stat-label">{statLabel}</div>}
        </div>
      )}
      <h1 className="p1-case-hero__title">{heading}</h1>
      {subtitle && <p className="p1-case-hero__sub">{subtitle}</p>}
      {buttonLabel && (
        <Btn variant={dark ? "yellow" : "primary"} href={buttonHref} target={buttonTarget}>
          {buttonLabel}
        </Btn>
      )}
    </div>
  );
  return (
    <div className="p1-case-hero" data-layout={slug(layout)} data-tone={tone}>
      <Section tone={tone} width={width}>
        {layout === "split + photo" || layout === "magazine" ? (
          <div className="p1-case-hero__split">
            {layout === "magazine" && photo}
            {copy}
            {layout === "split + photo" && photo}
          </div>
        ) : (
          copy
        )}
      </Section>
    </div>
  );
}
