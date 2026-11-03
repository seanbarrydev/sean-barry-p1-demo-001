import type { CSSProperties } from "react";
import { Section } from "@/lib/section";
import { Btn } from "@/lib/btn";
import { Icon } from "@/lib/icons";
import { textOf } from "@/lib/text";
import "./partner-detail.css";

export interface PartnerStat {
  value: string;
  label: string;
}

export interface PartnerLine {
  label: string;
}

export interface PartnerDetailProps {
  name: string;
  tier: string;
  tagline: string;
  about: string;
  capabilities: PartnerLine[];
  certs: PartnerLine[];
  stats: PartnerStat[];
  primary: string;
  secondary: string;
  primaryHref?: string;
  secondaryHref?: string;
  connectTitle: string;
  steps: PartnerLine[];
  permissions: PartnerLine[];
  connectNote: string;
  layout: "header + sidebar" | "stat band" | "long-form" | "install / connect";
  tierBadge: "off" | "on";
  tone: "light" | "gray";
  width: "contained" | "full bleed";
}

// In the editor an inline-editable value arrives as an element, not a string.
const slug = (v: unknown) =>
  typeof v === "string" ? v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "";

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="p1-partner-detail__checks">
      {items.map((c, i) => (
        <li key={i}>
          <Icon name="shield-check" />
          {c}
        </li>
      ))}
    </ul>
  );
}

export function PartnerDetailRender({
  name,
  tier,
  tagline,
  about,
  capabilities,
  certs,
  stats,
  primary,
  secondary,
  primaryHref,
  secondaryHref,
  connectTitle,
  steps,
  permissions,
  connectNote,
  layout,
  tierBadge,
  tone,
  width,
}: PartnerDetailProps) {
  const caps = (capabilities || []).map((c) => c.label).filter(Boolean);
  const certList = (certs || []).map((c) => c.label).filter(Boolean);
  const statList = stats || [];
  const stepList = (steps || []).map((s) => s.label).filter(Boolean);
  const permList = (permissions || []).map((s) => s.label).filter(Boolean);

  const body = (
    <div className="p1-partner-detail__body">
      <h3 className="p1-partner-detail__h3">About</h3>
      {about && <p className="p1-partner-detail__about">{about}</p>}
      <h3 className="p1-partner-detail__h3">Capabilities</h3>
      <ul className="p1-partner-detail__caps">
        {caps.map((c, i) => (
          <li key={i}>
            <Icon name="check" strokeWidth={3} />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );

  const side = (
    <aside className="p1-partner-detail__card">
      {primary && <Btn variant="yellow" href={primaryHref}>{primary}</Btn>}
      {secondary && <Btn variant="secondary" href={secondaryHref}>{secondary}</Btn>}
      <div>
        <p className="p1-partner-detail__over">Certifications</p>
        <Checks items={certList} />
      </div>
    </aside>
  );

  const connect = (
    <aside className="p1-partner-detail__card">
      {connectTitle && <h3 className="p1-partner-detail__h3">{connectTitle}</h3>}
      {stepList.length > 0 && (
        <ol className="p1-partner-detail__steps">
          {stepList.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}
      {permList.length > 0 && (
        <div>
          <p className="p1-partner-detail__over">Permissions</p>
          <Checks items={permList} />
        </div>
      )}
      <Btn variant="yellow" href={primaryHref}>Connect {name}</Btn>
      <Btn variant="secondary" href={secondaryHref}>View setup docs</Btn>
      {connectNote && <p className="p1-partner-detail__note">{connectNote}</p>}
    </aside>
  );

  return (
    <Section tone={tone} width={width} className="p1-partner-detail">
      <div className="p1-partner-detail__root" data-layout={slug(layout || "")}>
        <header className="p1-partner-detail__head">
          <span className="p1-partner-detail__logo" aria-hidden="true">
            {textOf(name).charAt(0)}
          </span>
          <div className="p1-partner-detail__titles">
            <div className="p1-partner-detail__title-row">
              {name && <h1 className="p1-partner-detail__name">{name}</h1>}
              {tierBadge === "on" && tier && (
                <span className="p1-partner-detail__tier" data-tier={slug(textOf(tier))}>
                  {tier}
                </span>
              )}
            </div>
            {tagline && <p className="p1-partner-detail__tagline">{tagline}</p>}
          </div>
        </header>
        {layout === "stat band" && (
          <div
            className="p1-partner-detail__stats"
            style={{ "--p1-partner-detail-cols": statList.length || 1 } as CSSProperties}
          >
            {statList.map((s, i) => (
              <div key={i} className="p1-partner-detail__stat">
                <div className="p1-partner-detail__stat-value">{s.value}</div>
                <div className="p1-partner-detail__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {layout === "long-form" ? (
          <div className="p1-partner-detail__long">
            {body}
            {side}
          </div>
        ) : (
          <div className="p1-partner-detail__split">
            {body}
            {layout === "install / connect" ? connect : side}
          </div>
        )}
      </div>
    </Section>
  );
}
