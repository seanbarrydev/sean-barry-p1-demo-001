import { useId } from "react";
import { Icon, type IconName } from "@/lib/icons";
import "./callout-box.css";

export interface CalloutBoxProps {
  variant: "info" | "warning" | "success" | "critical";
  showTitle: "off" | "on";
  title: string;
  text: string;
  icon: "off" | "on";
  dismissible: "off" | "on";
  border: "left bar" | "outline" | "none";
}

const ICON_BY_VARIANT: Record<CalloutBoxProps["variant"], IconName> = {
  info: "help",
  warning: "bell",
  success: "check-circle",
  critical: "shield",
};

const DEFAULT_TITLE: Record<CalloutBoxProps["variant"], string> = {
  info: "Note",
  warning: "Heads up",
  success: "Done",
  critical: "Important",
};

export function CalloutBoxRender({ variant = "info", showTitle, title, text, icon, dismissible, border = "left bar" }: CalloutBoxProps) {
  const id = useId();
  const dismiss = dismissible === "on";
  return (
    <div className="p1-callout-box p1-block" data-variant={variant} data-border={border.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}>
      {dismiss && <input type="checkbox" id={id} className="p1-callout-box__toggle" />}
      <div className="p1-callout-box__inner">
        <div className="p1-callout-box__box">
          {icon === "on" && (
            <span className="p1-callout-box__icon" aria-hidden="true">
              <Icon name={ICON_BY_VARIANT[variant]} />
            </span>
          )}
          <div className="p1-callout-box__content">
            {showTitle === "on" && <div className="p1-callout-box__title">{title || DEFAULT_TITLE[variant]}</div>}
            <p className="p1-callout-box__text">{text}</p>
          </div>
          {dismiss && (
            <label htmlFor={id} className="p1-callout-box__dismiss" aria-label="Dismiss">
              <Icon name="x" />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
