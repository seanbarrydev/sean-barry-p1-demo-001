import { P1_FALLBACKS } from '@/lib/assets';
import { FallbackImg } from '@/lib/img';
import { Icon } from '@/lib/icons';
import { textOf } from "@/lib/text";
import "./team-grid.css";


export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  team?: string;
}
export interface TeamGridProps {
  eyebrow: string;
  heading: string;
  columns: "2" | "3" | "4";
  shape: "circle" | "rounded" | "square";
  tone: "white" | "light";
  members: TeamMember[];
  layout?: "grid 4-col" | "photo cards" | "with filter" | "leadership row";
  social?: "off" | "on";
}


export function TeamGridRender({ eyebrow, heading, columns, shape, tone, members, layout = "grid 4-col", social = "off" }: TeamGridProps) {
  const all = members || [];
  const list = layout === "leadership row" ? all.slice(0, 3) : all;
  const teams = [...new Set(all.map((m) => (m.team ?? "").trim()).filter(Boolean))];
  // Only the default layout follows the columns field; the others have a fixed count.
  const cols = layout === "grid 4-col" ? columns : layout === "leadership row" ? "3" : "4";
  return (
    <div
      className="p1-team-grid p1-block"
      data-tone={tone}
      data-cols={cols}
      data-layout={layout.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}
    >
      <div className="p1-team-grid__inner">
        <div className="p1-team-grid__header">
          {eyebrow && <p className="p1-team-grid__eyebrow">{eyebrow}</p>}
          {heading && <h2 className="p1-team-grid__heading">{heading}</h2>}
        </div>
        {layout === "with filter" && (
          <ul className="p1-team-grid__chips" aria-hidden="true">
            {[...new Set(["All", ...teams])].map((t, i) => (
              <li key={t} className="p1-team-grid__chip" data-active={i === 0 ? "true" : undefined}>{t}</li>
            ))}
          </ul>
        )}
        <div className="p1-team-grid__grid">
          {list.map((m, i) => (
            <div key={i} className="p1-team-grid__member">
              <div className="p1-team-grid__avatar" data-shape={shape}>
                {m.avatar && <FallbackImg src={m.avatar} fallback={P1_FALLBACKS.AVATAR} alt={textOf(m.name)} className="p1-team-grid__avatar-img" />}
              </div>
              <div className="p1-team-grid__name">{m.name}</div>
              <div className="p1-team-grid__role">{m.role}</div>
              {m.bio && <p className="p1-team-grid__bio">{m.bio}</p>}
              {social === "on" && (
                <div className="p1-team-grid__social" aria-hidden="true">
                  <Icon name="link" />
                  <Icon name="mail" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
