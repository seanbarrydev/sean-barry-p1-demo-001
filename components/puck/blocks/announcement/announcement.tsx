import { useId } from "react";
import { TextLink } from "@/lib/btn";
import { Icon } from "@/lib/icons";
import "./announcement.css";

export interface AnnouncementProps {
  text: string;
  linkLabel: string;
  linkHref?: string;
  linkTarget?: "_self" | "_blank";
  tone: "accent" | "yellow" | "dark" | "gradient";
  align: "center" | "left";
  style?: "default" | "quiet" | "bold" | "critical";
  icon?: "off" | "on";
  dismissible?: "off" | "on";
}

export function AnnouncementRender({
  text,
  linkLabel,
  linkHref,
  linkTarget,
  tone,
  align,
  style = "default",
  icon = "off",
  dismissible = "off",
}: AnnouncementProps) {
  const id = useId();
  const dismiss = dismissible === "on";
  return (
    // One root keeps the checkbox next to the bar, so a host that wraps the block cannot split them.
    <div className="p1-announcement-root">
      {dismiss && <input type="checkbox" id={id} className="p1-announcement__toggle" />}
      <div
        className="p1-announcement"
        data-tone={tone}
        data-align={align}
        data-style={style}
      >
        {icon === "on" && (
          <span className="p1-announcement__icon" aria-hidden="true">
            <Icon name="megaphone" />
          </span>
        )}
        <span className="p1-announcement__text">{text}</span>
        {linkLabel && (
          <TextLink className="p1-announcement__link" href={linkHref} target={linkTarget}>
            {linkLabel}
          </TextLink>
        )}
        {dismiss && (
          <label htmlFor={id} className="p1-announcement__dismiss" aria-label="Dismiss">
            <Icon name="x" />
          </label>
        )}
      </div>
    </div>
  );
}
