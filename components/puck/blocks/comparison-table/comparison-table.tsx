import { Icon } from "@/lib/icons";
import { textOf } from "@/lib/text";
import "./comparison-table.css";

export interface ComparisonRow {
  feature: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
}
export interface ComparisonTableProps {
  eyebrow: string;
  heading: string;
  subtitle: string;
  columns: string;
  featured: "none" | "1" | "2" | "3" | "4";
  rows: ComparisonRow[];
  cell?: "icons" | "text";
  sticky?: "off" | "on";
  toggle?: "off" | "on";
}

const splitLines = (s: string) =>
  String(s || "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

const ROW_KEYS = ["c1", "c2", "c3", "c4"] as const satisfies readonly (keyof ComparisonRow)[];
function rowKeyFor(ci: number): keyof ComparisonRow {
  switch (ci) {
    case 0: return ROW_KEYS[0];
    case 1: return ROW_KEYS[1];
    case 2: return ROW_KEYS[2];
    default: return ROW_KEYS[3];
  }
}

const CMP_YES = ["yes", "true", "✓", "✔", "check", "included", "all", "y", "∞"];
const CMP_NO = ["no", "false", "✗", "✕", "x", "none", "n"];

function CmpCell({ v, text }: { v: string; text?: boolean }) {
  const s = String(v == null ? "" : v).trim();
  const l = s.toLowerCase();
  if (s === "" || s === "-" || s === "—") return <span className="p1-comparison__dash">—</span>;
  if (text) return <span className="p1-comparison__val">{s}</span>;
  if (CMP_YES.includes(l)) return <Icon name="check" strokeWidth={2.6} className="p1-comparison__check" />;
  if (CMP_NO.includes(l)) return <Icon name="x" strokeWidth={2.4} className="p1-comparison__cross" />;
  return <span className="p1-comparison__val">{s}</span>;
}

const GROUP_MARK = "##";
const groupLabel = (r: ComparisonRow) => {
  const f = textOf(r.feature).trim();
  return f.startsWith(GROUP_MARK) ? f.slice(GROUP_MARK.length).trim() : null;
};

// A row whose feature starts with "##" opens a new group; rows before the first one are ungrouped.
function groupRows(rows: ComparisonRow[]) {
  const groups: { label: string | null; rows: ComparisonRow[] }[] = [];
  let cur: { label: string | null; rows: ComparisonRow[] } = { label: null, rows: [] };
  groups.push(cur);
  for (const r of rows) {
    const l = groupLabel(r);
    if (l === null) cur.rows.push(r);
    else groups.push((cur = { label: l, rows: [] }));
  }
  return groups.filter((g) => g.label !== null || g.rows.length);
}

export function ComparisonTableRender({
  eyebrow,
  heading,
  subtitle,
  columns,
  featured,
  rows,
  cell = "icons",
  sticky = "off",
  toggle = "off",
}: ComparisonTableProps) {
  const plans = splitLines(columns).slice(0, 4);
  const hot = ({ none: -1, "1": 0, "2": 1, "3": 2, "4": 3 } as Record<string, number>)[featured] ?? -1;

  const text = cell === "text";
  const groups = groupRows(rows || []);
  const collapsible = toggle === "on" && groups.some((g) => g.label !== null);

  const bodyRows = (list: ComparisonRow[]) =>
    list.map((row, ri) => (
      <tr key={ri}>
        <td className="p1-comparison__row-label">{row.feature}</td>
        {plans.map((_, ci) => (
          <td key={ci} className="p1-comparison__cell" data-hot={ci === hot ? "true" : undefined}>
            <CmpCell v={row[rowKeyFor(ci)]} text={text} />
          </td>
        ))}
      </tr>
    ));
  const cols = (
    <colgroup>
      <col className="p1-comparison__col-feature" />
      {plans.map((_, i) => (
        <col key={i} />
      ))}
    </colgroup>
  );

  return (
    <div className="p1-comparison-table p1-block">
      <div className="p1-comparison__inner">
        <div className="p1-comparison__header">
          {eyebrow && <p className="p1-comparison__eyebrow">{eyebrow}</p>}
          {heading && <h2 className="p1-comparison__heading">{heading}</h2>}
          {subtitle && <p className="p1-comparison__subtitle">{subtitle}</p>}
        </div>

        <div
          className="p1-comparison__table-wrap"
          data-sticky={sticky === "on" ? "true" : undefined}
          data-collapsible={collapsible ? "true" : undefined}
        >
          <table className="p1-comparison__table">
            {cols}
            <thead>
              <tr>
                <th className="p1-comparison__feature-col">Features</th>
                {plans.map((pl, i) => (
                  <th key={i} className="p1-comparison__col-head" data-hot={i === hot ? "true" : undefined}>
                    {pl}
                  </th>
                ))}
              </tr>
            </thead>
            {collapsible
              ? null
              : groups.map((g, gi) => (
                  <tbody key={gi}>
                    {g.label !== null && (
                      <tr>
                        <th scope="rowgroup" colSpan={plans.length + 1} className="p1-comparison__group-label">
                          {g.label}
                        </th>
                      </tr>
                    )}
                    {bodyRows(g.rows)}
                  </tbody>
                ))}
          </table>
          {collapsible &&
            groups.map((g, gi) => {
              const t = (
                <table className="p1-comparison__table" aria-label={g.label ?? undefined}>
                  {cols}
                  <thead className="p1-comparison__sr-head">
                    <tr>
                      <th scope="col"><span className="p1-visually-hidden">Features</span></th>
                      {plans.map((pl, i) => (
                        <th key={i} scope="col"><span className="p1-visually-hidden">{pl}</span></th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{bodyRows(g.rows)}</tbody>
                </table>
              );
              return g.label === null ? (
                <div key={gi}>{t}</div>
              ) : (
                <details key={gi} className="p1-comparison__group" open>
                  <summary className="p1-comparison__group-summary">{g.label}</summary>
                  {t}
                </details>
              );
            })}
        </div>

        <div className="p1-comparison__cards">
          {plans.map((pl, ci) => (
            <div key={ci} className="p1-comparison__card" data-hot={ci === hot ? "true" : undefined}>
              <div className="p1-comparison__card-head">{pl}</div>
              {groups.map((g, gi) => [
                g.label !== null && (
                  <div key={`g${gi}`} className="p1-comparison__card-group">
                    {g.label}
                  </div>
                ),
                ...g.rows.map((row, ri) => (
                  <div key={`${gi}-${ri}`} className="p1-comparison__card-row">
                    <span className="p1-comparison__card-label">{row.feature}</span>
                    <span className="p1-comparison__card-val">
                      <CmpCell v={row[rowKeyFor(ci)]} text={text} />
                    </span>
                  </div>
                )),
              ])}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
