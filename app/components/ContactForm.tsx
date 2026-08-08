"use client";

import { FormEvent, useState } from "react";
import { Arrow } from "./SiteShell";
import { siteConfig } from "../data/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const email = String(data.get("email") || "").trim();

    if (!String(data.get("name") || "").trim()) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!data.get("service")) nextErrors.service = "Please select a service.";
    if (!data.get("budget")) nextErrors.budget = "Please select a budget range.";
    if (!String(data.get("message") || "").trim()) nextErrors.message = "Please tell us a little about the project.";

    setErrors(nextErrors);
    setSent(false);
    if (Object.keys(nextErrors).length) return;
    setSent(true);
    form.reset();
  };

  const fieldError = (name: string) => errors[name]
    ? <small className="field-error" id={`${name}-error`}>{errors[name]}</small>
    : null;
  const invalid = (name: string) => errors[name] ? true : undefined;

  return (
    <form className="inquiry-form" onSubmit={submit} action={siteConfig.contactEndpoint || undefined} noValidate>
      <label><span>Name *</span><input name="name" autoComplete="name" required placeholder="Your name" aria-invalid={invalid("name")} aria-describedby={errors.name ? "name-error" : undefined} />{fieldError("name")}</label>
      <label><span>Email *</span><input name="email" type="email" inputMode="email" autoComplete="email" required placeholder="you@company.com" aria-invalid={invalid("email")} aria-describedby={errors.email ? "email-error" : undefined} />{fieldError("email")}</label>
      <label><span>Phone / WhatsApp</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+51 000 000 000" /></label>
      <label><span>Business / Company</span><input name="business" autoComplete="organization" placeholder="Company or brand name" /></label>
      <label><span>What do you need? *</span><select name="service" defaultValue="" required aria-invalid={invalid("service")} aria-describedby={errors.service ? "service-error" : undefined}><option value="" disabled>Select a service</option><option>Landing Page</option><option>Business Website</option><option>Professional Website</option><option>Website Redesign</option><option>Not Sure Yet</option></select>{fieldError("service")}</label>
      <label><span>Budget range *</span><select name="budget" defaultValue="" required aria-invalid={invalid("budget")} aria-describedby={errors.budget ? "budget-error" : undefined}><option value="" disabled>Select a range</option><option>Under $300</option><option>$300 – $600</option><option>$600 – $1,000</option><option>$1,000+</option><option>Not sure</option></select>{fieldError("budget")}</label>
      <label className="full"><span>Tell us about your project *</span><textarea name="message" rows={5} required placeholder="What are you building, and what should the website help you achieve?" aria-invalid={invalid("message")} aria-describedby={errors.message ? "message-error" : undefined} />{fieldError("message")}</label>
      <div className="form-submit full"><p aria-live="polite">{sent ? "Thanks — your inquiry is ready for review. We’ll be in touch." : "Required fields are marked with *"}</p><button className="button button-primary" type="submit">Send project inquiry <Arrow /></button></div>
    </form>
  );
}