import { useId } from "react";
import { Btn } from "@/lib/btn";
import { Icon } from "@/lib/icons";
import "./pricing.css";

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string;
  buttonLabel: string;
  featured: "off" | "on";
  yearly?: string;
  blurb?: string;
  buttonHref?: string;
}
export interface PricingProps {
  eyebrow: string;
  heading: string;
  subtitle: string;
  tiers: PricingTier[];
  layout?: "cards" | "stacked rows";
  billing?: "off" | "on";
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const splitLines = (s: string) =>
  String(s || "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

export function PricingRender({
  eyebrow,
  heading,
  subtitle,
  tiers,
  layout = "cards",
  billing = "off",
}: PricingProps) {
  const toggleId = useId();
  const list = tiers || [];
  const rows = layout === "stacked rows";
  const showBilling = billing === "on";
  const cols = Math.min(4, Math.max(1, list.length));
  return (
    <div className="p1-pricing p1-block" data-layout={slug(layout)}>
      <div className="p1-pricing__inner">
        <div className="p1-pricing__header">
          {eyebrow && <p className="p1-pricing__eyebrow">{eyebrow}</p>}
          {heading && <h2 className="p1-pricing__heading">{heading}</h2>}
          {subtitle && <p className="p1-pricing__subtitle">{subtitle}</p>}
        </div>
        {showBilling && (
          <>
            <input type="checkbox" id={toggleId} className="p1-visually-hidden p1-pricing__billing-input" aria-label="Show yearly prices" />
            <label htmlFor={toggleId} className="p1-pricing__billing">
              <span className="p1-pricing__billing-opt" data-opt="monthly" aria-hidden="true">Monthly</span>
              <span className="p1-pricing__billing-opt" data-opt="yearly" aria-hidden="true">Yearly</span>
            </label>
          </>
        )}
        <div
          className="p1-pricing__grid"
          style={rows ? undefined : { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {list.map((tier, i) => {
            const hot = tier.featured === "on";
            const swap = showBilling && !!tier.yearly?.trim();
            const price = (
              <>
                <span className="p1-pricing__price" data-bill="monthly" data-swap={swap || undefined}>
                  {tier.price}
                </span>
                {swap && (
                  <span className="p1-pricing__price" data-bill="yearly">
                    {tier.yearly}
                  </span>
                )}
              </>
            );
            if (rows) {
              return (
                <div key={i} className="p1-pricing__row" data-featured={tier.featured}>
                  <div>
                    <div className="p1-pricing__tier-name">{tier.name}</div>
                    {tier.blurb && <p className="p1-pricing__blurb">{tier.blurb}</p>}
                  </div>
                  <p className="p1-pricing__row-features">{splitLines(tier.features).join(" · ")}</p>
                  <div className="p1-pricing__row-price">
                    <div className="p1-pricing__price-row">
                      {price}
                      {tier.period && <span className="p1-pricing__period">{tier.period}</span>}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="p1-pricing__card" data-featured={tier.featured}>
                {hot && (
                  <span className="p1-pricing__badge">Most popular</span>
                )}
                <div className="p1-pricing__tier-name">{tier.name}</div>
                <div className="p1-pricing__price-row">
                  {price}
                  {tier.period && <span className="p1-pricing__period">{tier.period}</span>}
                </div>
                {tier.blurb && <p className="p1-pricing__blurb">{tier.blurb}</p>}
                <ul className="p1-pricing__features">
                  {splitLines(tier.features).map((f, j) => (
                    <li key={j} className="p1-pricing__feature">
                      <Icon name="check" strokeWidth={3} className="p1-pricing__check" />
                      <span className="p1-pricing__feature-text">{f}</span>
                    </li>
                  ))}
                </ul>
                <Btn variant={hot ? "yellow" : "secondary"} href={tier.buttonHref} className="p1-pricing__btn">
                  {tier.buttonLabel}
                </Btn>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
