import { useId } from "react";
import { Icon } from "@/lib/icons";
import "./doc-shell.css";

export interface DocShellItem {
  label: string;
}
export interface DocShellProps {
  title: string;
  intro: string;
  nav: DocShellItem[];
  current: string;
  topNav: DocShellItem[];
  toc: DocShellItem[];
  layout?: "three pane" | "sidebar only" | "top nav" | "mobile drawer";
  search?: "off" | "on";
  breadcrumb?: "off" | "on";
  edit?: "off" | "on";
  tone?: "light" | "gray";
  width?: "contained" | "full bleed";
}

const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const isGroup = (n: DocShellItem) => n.label.startsWith("##");

export function DocShellRender({
  title,
  intro,
  nav = [],
  current = "",
  topNav = [],
  toc = [],
  layout = "three pane",
  search = "on",
  breadcrumb = "on",
  edit = "on",
  tone = "light",
  width = "contained",
}: DocShellProps) {
  const drawerId = useId();
  const showSearch = search === "on";
  // Puck sends null for an emptied list, which a destructuring default does not catch.
  const navItems = (nav || []).filter((n) => n.label);
  const currentLabel = (current || "").trim().toLowerCase();
  const currentIndex = navItems.findIndex((n) => !isGroup(n) && n.label.trim().toLowerCase() === currentLabel);
  const currentGroup = navItems.slice(0, Math.max(currentIndex, 0)).reverse().find(isGroup);
  const crumbs = ["Docs", currentGroup?.label.replace(/^##\s*/, ""), currentIndex >= 0 ? navItems[currentIndex]?.label : undefined].filter(Boolean);
  const tocItems = (toc || []).filter((t) => t.label);
  const drawer = layout === "mobile drawer";

  const sidebar = (
    <nav className="p1-doc-shell__nav" aria-label="Documentation">
      {showSearch && !drawer && (
        <span className="p1-doc-shell__search">
          <Icon name="search" />
          Search docs
        </span>
      )}
      {navItems.map((n, i) =>
        isGroup(n) ? (
          <div key={i} className="p1-doc-shell__group">{n.label.replace(/^##\s*/, "")}</div>
        ) : (
          <div key={i} className="p1-doc-shell__link" aria-current={i === currentIndex ? "page" : undefined}>
            {n.label}
          </div>
        ),
      )}
    </nav>
  );

  const main = (
    <div className="p1-doc-shell__main">
      {breadcrumb === "on" && (
        <div className="p1-doc-shell__crumbs">
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && " › "}
              {i === crumbs.length - 1 && i > 0 ? <span className="p1-doc-shell__crumb-current">{c}</span> : c}
            </span>
          ))}
        </div>
      )}
      {title && <h1 className="p1-doc-shell__title">{title}</h1>}
      {intro && <p className="p1-doc-shell__intro">{intro}</p>}
      {tocItems.slice(0, 2).map((t, i) => (
        <div key={i}>
          <h2 className="p1-doc-shell__section-title">{t.label}</h2>
          <div className="p1-doc-shell__placeholder">Content</div>
        </div>
      ))}
      {edit === "on" && (
        <div className="p1-doc-shell__edit">
          <Icon name="edit" />
          Edit this page
        </div>
      )}
    </div>
  );

  const toc3 = layout === "three pane" && (
    <aside className="p1-doc-shell__toc">
      <div className="p1-doc-shell__toc-title">On this page</div>
      <div className="p1-doc-shell__toc-list">
        {tocItems.map((t, i) => (
          <span key={i} className="p1-doc-shell__toc-item" aria-current={i === 0 ? "true" : undefined}>
            {t.label}
          </span>
        ))}
      </div>
    </aside>
  );

  return (
    <div className="p1-doc-shell p1-block" data-layout={slug(layout)} data-tone={tone} data-width={width}>
      <div className="p1-doc-shell__inner">
        {drawer ? (
          <div className="p1-doc-shell__phone">
            <input type="checkbox" id={drawerId} className="p1-doc-shell__drawer-input" defaultChecked />
            <div className="p1-doc-shell__bar">
              <label htmlFor={drawerId} className="p1-doc-shell__burger">
                <Icon name="menu" />
                <span className="p1-doc-shell__sr">Open menu</span>
              </label>
              <span className="p1-doc-shell__bar-title">Docs</span>
              {showSearch && <Icon name="search" />}
            </div>
            <div className="p1-doc-shell__phone-body">{main}</div>
            <label htmlFor={drawerId} className="p1-doc-shell__scrim">
              <span className="p1-doc-shell__sr">Close menu</span>
            </label>
            <div className="p1-doc-shell__drawer">
              <div className="p1-doc-shell__drawer-head">
                Docs
                <label htmlFor={drawerId} className="p1-doc-shell__close">
                  <Icon name="x" />
                  <span className="p1-doc-shell__sr">Close menu</span>
                </label>
              </div>
              {sidebar}
            </div>
          </div>
        ) : (
          <>
            {layout === "top nav" && (
              <div className="p1-doc-shell__topbar">
                {(topNav || []).filter((l) => l.label).map((l, i) => (
                  <span key={i}>{l.label}</span>
                ))}
                {showSearch && <Icon name="search" />}
              </div>
            )}
            <div className="p1-doc-shell__grid">
              {layout !== "top nav" && sidebar}
              {main}
              {toc3}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
