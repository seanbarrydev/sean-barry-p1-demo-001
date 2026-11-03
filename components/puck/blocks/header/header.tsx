import { Icon } from "@/lib/icons";
import { TextLink, safeHref } from "@/lib/btn";
import "./header.css";

export interface HeaderLink {
  label: string;
  href: string;
}
export interface HeaderMegaItem {
  title: string;
  text: string;
  href: string;
}
export interface HeaderProps {
  logo: string;
  links: HeaderLink[];
  navAlign: "left" | "center" | "right";
  showSearch: "off" | "on";
  ctaLabel: string;
  ctaHref?: string;
  ctaTarget?: "_self" | "_blank";
  ctaStyle: "primary" | "yellow" | "purple" | "outline" | "none";
  tone: "white" | "light" | "dark";
  border: "on" | "off";
  sticky: "off" | "on";
  layout?: "logo left" | "centered" | "minimal" | "mega open";
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
  ctaSecondaryTarget?: "_self" | "_blank";
  megaItems?: HeaderMegaItem[];
}

const MEGA_ICONS = ["rocket", "shield", "globe", "branch", "layers", "clock"] as const;

export function HeaderRender({ logo, links, navAlign, showSearch, ctaLabel, ctaHref, ctaTarget, ctaStyle, tone, border, sticky, layout = "logo left", ctaSecondary, ctaSecondaryHref, ctaSecondaryTarget, megaItems }: HeaderProps) {
  const minimal = layout === "minimal";
  const list = links || [];
  const mega = megaItems ?? [];

  const logoEl = <span className="p1-header__logo">{logo}</span>;

  const nav = minimal ? null : (
    <nav className="p1-header__nav">
      {list.map((l, i) => (
        <a key={i} href={safeHref(l.href)} className="p1-header__link">
          {l.label}
        </a>
      ))}
    </nav>
  );

  const actions = (
    <div className="p1-header__actions">
      {showSearch === "on" && !minimal && <Icon name="search" className="p1-header__search-icon" />}
      {ctaSecondary && (
        <TextLink className="p1-header__cta-secondary" href={ctaSecondaryHref} target={ctaSecondaryTarget}>
          {ctaSecondary}
        </TextLink>
      )}
      {ctaStyle !== "none" && ctaLabel && (
        <TextLink className="p1-header__cta" href={ctaHref} target={ctaTarget} data-cta={ctaStyle}>
          {ctaLabel}
        </TextLink>
      )}
      <button type="button" aria-label="Menu" className="p1-header__burger">
        <Icon name="menu" className="p1-header__burger-icon" />
      </button>
    </div>
  );

  return (
    <header
      className="p1-header"
      data-layout={layout.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      data-tone={tone}
      data-border={border}
      data-sticky={sticky === "on" ? "on" : undefined}
    >
      <div className="p1-header__inner">
        {layout === "centered" && (
          <>
            <span className="p1-header__side">{nav}</span>
            {logoEl}
            <span className="p1-header__side p1-header__side--end">{actions}</span>
          </>
        )}
        {layout === "minimal" && (
          <>
            {logoEl}
            <span className="p1-header__spacer" />
            {actions}
          </>
        )}
        {layout !== "centered" && layout !== "minimal" && navAlign === "left" && (
          <>
            {logoEl}
            <span className="p1-header__gap-start">{nav}</span>
            <span className="p1-header__spacer" />
            {actions}
          </>
        )}
        {layout !== "centered" && layout !== "minimal" && navAlign === "right" && (
          <>
            {logoEl}
            <span className="p1-header__spacer" />
            {nav}
            <span className="p1-header__gap-end">{actions}</span>
          </>
        )}
        {layout !== "centered" && layout !== "minimal" && navAlign === "center" && (
          <>
            {logoEl}
            <span className="p1-header__spacer" />
            {nav}
            <span className="p1-header__spacer" />
            {actions}
          </>
        )}
      </div>
      {layout === "mega open" && mega.length > 0 && (
        <div className="p1-header__mega">
          <div className="p1-header__mega-grid">
            {mega.map((m, i) => (
              <a key={i} href={safeHref(m.href)} className="p1-header__mega-item">
                <Icon name={MEGA_ICONS[i % MEGA_ICONS.length] ?? "rocket"} className="p1-header__mega-icon" />
                <div>
                  <div className="p1-header__mega-title">{m.title}</div>
                  <div className="p1-header__mega-text">{m.text}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
