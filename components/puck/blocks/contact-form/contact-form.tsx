import { useId } from "react";
import { Section, SectionHead, type SectionTone, type SectionWidth } from "@/lib/section";
import "./contact-form.css";

export interface ContactFormLabel {
  label: string;
}
export interface ContactFormProps {
  eyebrow: string;
  heading: string;
  subtitle: string;
  fields: ContactFormLabel[];
  reasons: ContactFormLabel[];
  reason: "off" | "on";
  reasonLabel: string;
  consent: "off" | "on";
  consentText: string;
  step1: string;
  step2: string;
  btn: string;
  layout: "stacked" | "2-col + textarea" | "inline single" | "stepper";
  tone: SectionTone;
  width: SectionWidth;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const labels = (a?: ContactFormLabel[]) => (a || []).map((x) => x?.label?.trim()).filter(Boolean) as string[];

function Field({ id, label, kind }: { id: string; label: string; kind: "text" | "email" | "area" }) {
  return (
    <div className="p1-contact-form__field" data-kind={kind}>
      <label className="p1-contact-form__label" htmlFor={id}>{label}</label>
      {kind === "area" ? (
        <textarea className="p1-contact-form__control" id={id} name={id} rows={4} />
      ) : (
        <input className="p1-contact-form__control" id={id} name={id} type={kind} />
      )}
    </div>
  );
}

export function ContactFormRender({
  eyebrow, heading, subtitle, fields, reasons, reason, reasonLabel, consent, consentText, step1, step2, btn, layout = "2-col + textarea", tone, width,
}: ContactFormProps) {
  const uid = useId();
  const all = labels(fields);
  const isMsg = (x: string) => /message/i.test(x);
  const rest = all.filter((x) => !isMsg(x));
  const msg = all.filter(isMsg);
  const reasonList = labels(reasons);
  const showReason = reason === "on" && reasonList.length > 0;
  const kindOf = (x: string) => (/e-?mail/i.test(x) ? "email" : "text");
  const fid = (i: number) => `${uid}-f${i}`;
  const button = btn ? <button type="button" className="p1-contact-form__btn">{btn}</button> : null;

  const reasonField = showReason && (
    <div className="p1-contact-form__field">
      <label className="p1-contact-form__label" htmlFor={`${uid}-reason`}>{reasonLabel}</label>
      <select className="p1-contact-form__control" id={`${uid}-reason`} name="reason">
        {reasonList.map((r) => <option key={r}>{r}</option>)}
      </select>
    </div>
  );
  const consentField = consent === "on" && (
    <div className="p1-contact-form__consent">
      <input type="checkbox" id={`${uid}-consent`} name="consent" />
      <label htmlFor={`${uid}-consent`}>{consentText}</label>
    </div>
  );
  const restFields = rest.map((x, i) => <Field key={i} id={fid(i)} label={x} kind={kindOf(x)} />);
  const msgFields = msg.map((x, i) => <Field key={i} id={fid(100 + i)} label={x} kind="area" />);

  let body;
  if (layout === "inline single") {
    const email = all.find((x) => kindOf(x) === "email") || "Work email";
    body = (
      <div className="p1-contact-form__inline">
        <Field id={fid(0)} label={email} kind="email" />
        {button}
      </div>
    );
  } else if (layout === "stepper") {
    body = (
      <>
        <fieldset className="p1-contact-form__step">
          <legend className="p1-contact-form__legend"><span className="p1-contact-form__num">1</span>{step1}</legend>
          <div className="p1-contact-form__grid">{restFields}</div>
        </fieldset>
        <fieldset className="p1-contact-form__step">
          <legend className="p1-contact-form__legend"><span className="p1-contact-form__num">2</span>{step2}</legend>
          {reasonField}
          {msgFields}
        </fieldset>
        {consentField}
        <div>{button}</div>
      </>
    );
  } else {
    body = (
      <>
        <div className="p1-contact-form__grid">{restFields}</div>
        {reasonField}
        {msgFields}
        {consentField}
        <div>{button}</div>
      </>
    );
  }

  return (
    <Section tone={tone} width={width}>
      <SectionHead eyebrow={eyebrow} heading={heading} subtitle={subtitle} />
      <div className="p1-contact-form" data-layout={slug(layout)}>
        <div className="p1-contact-form__form">{body}</div>
      </div>
    </Section>
  );
}
