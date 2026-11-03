import { useId } from "react";
import { Section } from "@/lib/section";
import { textOf } from "@/lib/text";
import "./code-block.css";

export interface CodeBlockTab {
  lang: string;
  code: string;
}

export interface CodeBlockProps {
  tabs: CodeBlockTab[];
  filename: string;
  highlight: string;
  lineNumbers: "off" | "on";
  output: "off" | "on";
  outputText: string;
  theme: "dark" | "light";
}


// The tab styles in code-block.css stop at this many.
const MAX_TABS = 8;

export function CodeBlockRender({ tabs, filename, highlight, lineNumbers, output, outputText, theme }: CodeBlockProps) {
  const id = useId();
  const list = (tabs || []).slice(0, MAX_TABS);
  // "2, 4-6" marks lines 2, 4, 5 and 6 (a range may be written either way round); other entries are ignored.
  const ranges = String(highlight || "").split(",").flatMap((part): [number, number][] => {
    const m = part.match(/^\s*(\d+)(?:\s*-\s*(\d+))?\s*$/);
    if (!m) return [];
    const [x, y] = [Number(m[1]), Number(m[2] ?? m[1])];
    return [[Math.min(x, y), Math.max(x, y)]];
  });
  const isMarked = (line: number) => ranges.some(([from, to]) => line >= from && line <= to);
  return (
    <Section>
      <div className="p1-code-block" data-theme={theme} data-line-numbers={lineNumbers}>
        {/* Hidden radios drive the tabs; each tab's label and panel pair up by position. */}
        {list.map((tb, i) => (
          <input
            key={i}
            id={`${id}-${i}`}
            className="p1-code-block__radio"
            type="radio"
            name={id}
            defaultChecked={i === 0}
            aria-label={textOf(tb.lang) || `Tab ${i + 1}`}
          />
        ))}
        <div className="p1-code-block__bar">
          {list.length > 1 &&
            list.map((tb, i) => (
              <label key={i} htmlFor={`${id}-${i}`} className="p1-code-block__tab">
                {tb.lang || `Tab ${i + 1}`}
              </label>
            ))}
          {filename && <span className="p1-code-block__filename">{filename}</span>}
        </div>
        {list.map((tb, i) => (
          <pre key={i} className="p1-code-block__panel" tabIndex={0}>
            {(tb.code || "").split("\n").map((ln, n) => (
              <span key={n} className="p1-code-block__line" data-highlight={isMarked(n + 1) ? "true" : undefined}>
                {ln || " "}
              </span>
            ))}
          </pre>
        ))}
        {output === "on" && outputText && <div className="p1-code-block__output">{outputText}</div>}
      </div>
    </Section>
  );
}
