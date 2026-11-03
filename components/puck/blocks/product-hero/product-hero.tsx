import { Btn } from "@/lib/btn";
import { Section, type SectionTone, type SectionWidth } from "@/lib/section";
import { FallbackImg } from "@/lib/img";
import { wireframe } from "@/lib/define-meta";
import "./product-hero.css";

type Target = "_self" | "_blank";
export interface ProductHeroCommand {
  line: string;
}
export interface ProductHeroProps {
  product: string;
  heading: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
  buttonTarget: Target;
  button2Label: string;
  button2Href: string;
  button2Target: Target;
  image: string;
  commands: ProductHeroCommand[];
  layout: "screen right" | "browser frame" | "code-first" | "full bleed";
  tone: SectionTone;
  width: SectionWidth;
}

const SCREEN = wireframe(1600, 1000);
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function ProductHeroRender(p: ProductHeroProps) {
  const layout = p.layout || "screen right";
  const bleed = layout === "full bleed";
  const code = layout === "code-first";
  const lines = (p.commands || []).map((c) => c?.line ?? "");
  const tone = bleed ? "dark" : p.tone || "light";

  const copy = (
    <div className="p1-product-hero__copy">
      {p.product && <p className="p1-product-hero__product">{p.product}</p>}
      {p.heading && <h1 className="p1-product-hero__heading">{p.heading}</h1>}
      {p.subtitle && <p className="p1-product-hero__subtitle">{p.subtitle}</p>}
      {(p.buttonLabel || p.button2Label) && (
        <div className="p1-product-hero__actions">
          {p.buttonLabel && <Btn href={p.buttonHref} target={p.buttonTarget}>{p.buttonLabel}</Btn>}
          {p.button2Label && <Btn variant="secondary" href={p.button2Href} target={p.button2Target}>{p.button2Label}</Btn>}
        </div>
      )}
    </div>
  );

  const surface = code ? (
    lines.some(Boolean) ? <pre className="p1-product-hero__code"><code>{lines.join("\n")}</code></pre> : null
  ) : (
    <div className="p1-product-hero__frame" data-browser={bleed || layout === "browser frame" ? "on" : "off"}>
      <div className="p1-product-hero__bar" aria-hidden="true"><span /><span /><span /></div>
      <FallbackImg className="p1-product-hero__screen" src={p.image} fallback={SCREEN} alt="" />
    </div>
  );

  return (
    <Section tone={tone} width={p.width} className="p1-product-hero p1-block">
      <div className="p1-product-hero__body" data-layout={slug(layout)}>
        {code ? <>{surface}{copy}</> : <>{copy}{surface}</>}
      </div>
    </Section>
  );
}
