import { TextLink } from "@/lib/btn";
import { Icon } from "@/lib/icons";
import { Section, SectionHead } from "@/lib/section";
import "./locations.css";

export interface LocationPlace {
  city: string;
  address: string;
  hours: string;
  directionsHref?: string;
}
export interface LocationsProps {
  eyebrow: string;
  heading: string;
  places: LocationPlace[];
  layout: "map + cards" | "card grid" | "map hero" | "address line";
  hours: "off" | "on";
  directions: "off" | "on";
  tone: "light" | "gray";
  width: "contained" | "full bleed";
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function LocationsRender(p: LocationsProps) {
  const layout = p.layout || "map + cards";
  const places = p.places || [];

  const card = (x: LocationPlace, i: number) => (
    <li key={i} className="p1-locations__card">
      <h3 className="p1-locations__city"><Icon name="globe" />{x.city}</h3>
      {x.address && <p className="p1-locations__address">{x.address}</p>}
      {p.hours === "on" && x.hours && <p className="p1-locations__hours">{x.hours}</p>}
      {p.directions === "on" && (
        <TextLink href={x.directionsHref} className="p1-locations__directions">Directions</TextLink>
      )}
    </li>
  );
  const map = <div className="p1-locations__map" role="img" aria-label="Map placeholder">Map</div>;

  let body;
  if (layout === "address line") {
    body = (
      <ul className="p1-locations__line">
        {places.map((x, i) => <li key={i}><b>{x.city}</b> · {x.address}</li>)}
      </ul>
    );
  } else if (layout === "map hero") {
    body = (
      <div className="p1-locations__hero">
        {map}
        <ul className="p1-locations__list p1-locations__overlay">{places.slice(0, 1).map(card)}</ul>
      </div>
    );
  } else if (layout === "card grid") {
    body = <ul className="p1-locations__list p1-locations__grid">{places.map(card)}</ul>;
  } else {
    body = (
      <div className="p1-locations__split">
        <ul className="p1-locations__list">{places.map(card)}</ul>
        {map}
      </div>
    );
  }

  return (
    <Section tone={p.tone} width={p.width} className="p1-locations p1-block">
      <div data-layout={slug(layout)}>
        {layout !== "address line" && <SectionHead eyebrow={p.eyebrow} heading={p.heading} align="left" />}
        {body}
      </div>
    </Section>
  );
}
