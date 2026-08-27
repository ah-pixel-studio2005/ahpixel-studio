"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Arrow } from "./SiteShell";
import {
  budgetOptions,
  businessTypes,
  createWhatsappFollowUp,
  projectGoals,
  siteConfig,
  websiteTypes,
} from "../data/site";
import { trackStudioEvent } from "../lib/events";

type Language = "es" | "en";
type Status = "idle" | "submitting" | "success" | "error";

const copy = {
  en: {
    project: "Project",
    contact: "Contact",
    basics: "Project basics",
    details: "Contact details",
    websiteType: "Website type",
    businessType: "Business type",
    goal: "Main goal",
    budget: "Budget range",
    selectWebsite: "Select a website type",
    selectBusiness: "Select a business type",
    selectGoal: "Select the main goal",
    selectBudget: "Select a range",
    continue: "Continue to contact",
    name: "Name",
    email: "Email",
    phone: "Phone / WhatsApp",
    company: "Business / Company",
    message: "Tell us about your project",
    namePlaceholder: "Your name",
    companyPlaceholder: "Company or brand name",
    messagePlaceholder: "What are you building, and what should the website help you achieve?",
    back: "Project basics",
    submit: "Send project inquiry",
    sending: "Sending...",
    required: "Required fields are marked with *",
    successTitle: "THANK YOU. YOUR PROJECT INQUIRY HAS BEEN SENT.",
    successText: "We'll review the details and get back to you as soon as possible.",
    whatsapp: "Continue on WhatsApp",
    home: "Back to home",
    genericError: "We couldn't send your inquiry. Please try again or contact us on WhatsApp.",
    rateError: "Too many attempts. Please wait a few minutes or contact us on WhatsApp.",
    requiredSelect: "Please select an option.",
    requiredName: "Please enter your name.",
    requiredEmail: "Please enter your email.",
    invalidEmail: "Please enter a valid email address.",
    requiredMessage: "Please tell us a little about the project.",
  },
  es: {
    project: "Proyecto",
    contact: "Contacto",
    basics: "Datos del proyecto",
    details: "Datos de contacto",
    websiteType: "Tipo de sitio web",
    businessType: "Tipo de negocio",
    goal: "Objetivo principal",
    budget: "Rango de inversión",
    selectWebsite: "Selecciona un tipo de sitio",
    selectBusiness: "Selecciona un tipo de negocio",
    selectGoal: "Selecciona el objetivo principal",
    selectBudget: "Selecciona un rango",
    continue: "Continuar al contacto",
    name: "Nombre",
    email: "Correo",
    phone: "Teléfono / WhatsApp",
    company: "Negocio / Empresa",
    message: "Cuéntanos sobre tu proyecto",
    namePlaceholder: "Tu nombre",
    companyPlaceholder: "Nombre de tu empresa o marca",
    messagePlaceholder: "¿Qué necesitas crear y qué debería lograr el sitio web?",
    back: "Datos del proyecto",
    submit: "Enviar consulta",
    sending: "Enviando...",
    required: "Los campos obligatorios están marcados con *",
    successTitle: "GRACIAS. TU CONSULTA DE PROYECTO FUE ENVIADA.",
    successText: "Revisaremos los detalles y te responderemos lo antes posible.",
    whatsapp: "Continuar por WhatsApp",
    home: "Volver al inicio",
    genericError: "No pudimos enviar tu consulta. Inténtalo otra vez o escríbenos por WhatsApp.",
    rateError: "Demasiados intentos. Espera unos minutos o escríbenos por WhatsApp.",
    requiredSelect: "Selecciona una opción.",
    requiredName: "Ingresa tu nombre.",
    requiredEmail: "Ingresa tu correo.",
    invalidEmail: "Ingresa un correo válido.",
    requiredMessage: "Cuéntanos brevemente sobre el proyecto.",
  },
} as const;

function optionLabel(item: { label: string; labelEs: string }, language: Language) {
  return language === "es" ? item.labelEs : item.label;
}

export function ContactForm({ language = "en" }: { language?: Language }) {
  const t = copy[language];
  const [phase, setPhase] = useState(1);
  const [enhanced, setEnhanced] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [defaults, setDefaults] = useState({ websiteType: "", businessType: "", goal: "" });
  const [successData, setSuccessData] = useState({ name: "", websiteType: "" });
  const startedAt = useRef(0);
  const startedTracked = useRef(false);
  const submitting = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const websiteType = params.get("type") || "";
    const businessType = params.get("industry") || "";
    const goal = params.get("goal") || "";
    const frame = requestAnimationFrame(() => {
      setDefaults({
        websiteType: websiteTypes.some((item) => item.value === websiteType) ? websiteType : "",
        businessType: businessTypes.some((item) => item.value === businessType) ? businessType : "",
        goal: projectGoals.some((item) => item.value === goal) ? goal : "",
      });
      setEnhanced(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== 2) return;
    const frame = requestAnimationFrame(() => document.querySelector<HTMLInputElement>(".phased-inquiry [name=name]")?.focus());
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  const markStarted = () => {
    if (!startedAt.current) startedAt.current = Date.now();
    if (startedTracked.current) return;
    startedTracked.current = true;
    trackStudioEvent("contact_form_started", { language, sourcePage: location.pathname });
  };

  const projectErrors = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (!data.get("websiteType")) next.websiteType = t.requiredSelect;
    if (!data.get("businessType")) next.businessType = t.requiredSelect;
    if (!data.get("goal")) next.goal = t.requiredSelect;
    if (!data.get("budget")) next.budget = t.requiredSelect;
    return next;
  };

  const continueToContact = (event: React.MouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.form!;
    const next = projectErrors(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setPhase(2);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = projectErrors(form);
    const email = String(data.get("email") || "").trim();
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name) next.name = t.requiredName;
    if (!email) next.email = t.requiredEmail;
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = t.invalidEmail;
    if (!message) next.message = t.requiredMessage;
    setErrors(next);
    if (Object.keys(next).length) {
      if (next.websiteType || next.businessType || next.goal || next.budget) setPhase(1);
      return;
    }

    submitting.current = true;
    setStatus("submitting");
    setStatusMessage("");
    const websiteType = String(data.get("websiteType"));
    const payload = {
      name,
      email,
      phone: String(data.get("phone") || "").trim(),
      company: String(data.get("company") || "").trim(),
      websiteType,
      businessType: String(data.get("businessType")),
      goal: String(data.get("goal")),
      budget: String(data.get("budget")),
      message,
      language,
      sourcePage: location.pathname + location.search,
      createdAt: new Date().toISOString(),
      startedAt: startedAt.current || Date.now() - 2000,
      website: String(data.get("website") || ""),
    };

    const subject = language === "es" ? `Consulta web de ${name}` : `Website inquiry from ${name}`;
    const body = [
      `${language === "es" ? "Nombre" : "Name"}: ${name}`,
      `Email: ${email}`,
      `WhatsApp: ${payload.phone || "—"}`,
      `${language === "es" ? "Empresa" : "Company"}: ${payload.company || "—"}`,
      `${language === "es" ? "Tipo de sitio" : "Website type"}: ${websiteType}`,
      `${language === "es" ? "Objetivo" : "Goal"}: ${payload.goal}`,
      `${language === "es" ? "Presupuesto" : "Budget"}: ${payload.budget}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSuccessData({ name, websiteType: optionLabel(websiteTypes.find((item) => item.value === websiteType) || websiteTypes[0], language) });
    setStatus("success");
    trackStudioEvent("contact_form_submitted", { language, websiteType, sourcePage: location.pathname, transport: "mailto" });
    form.reset();
    submitting.current = false;
  };

  const error = (name: string) => errors[name] ? <small className="field-error" id={`${name}-error`}>{errors[name]}</small> : null;
  const invalid = (name: string) => errors[name] ? true : undefined;

  if (status === "success") {
    const whatsappUrl = createWhatsappFollowUp(successData.name, successData.websiteType);
    return <section className="inquiry-success" aria-live="polite" aria-labelledby="inquiry-success-title">
      <span className="inquiry-success-mark" aria-hidden="true">✓</span>
      <p className="eyebrow">AHPixel Studio / 01</p>
      <h3 id="inquiry-success-title">{t.successTitle}</h3>
      <p>{t.successText}</p>
      <div className="inquiry-success-actions">
        <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackStudioEvent("whatsapp_clicked", { source: "form_success", language })}>{t.whatsapp} <Arrow /></a>
        <a className="button button-dark" href="/">{t.home}</a>
      </div>
    </section>;
  }

  return <form className={`inquiry-form phased-inquiry ${enhanced ? "is-enhanced" : ""}`} onSubmit={submit} onFocusCapture={markStarted} onChange={markStarted} action={siteConfig.contactEndpoint} method="post" noValidate>
    <div className="inquiry-progress" aria-label={`${t.project} ${phase} / 2`}><button type="button" className={phase === 1 ? "active" : "done"} onClick={() => setPhase(1)}><span>01</span>{t.project}</button><i /><button type="button" className={phase === 2 ? "active" : ""} onClick={() => phase === 2 && setPhase(2)}><span>02</span>{t.contact}</button></div>
    <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <fieldset className={`inquiry-phase ${phase === 1 ? "active" : ""}`} aria-hidden={enhanced && phase !== 1} disabled={status === "submitting"}>
      <legend>{t.basics}</legend>
      <label><span>{t.websiteType} *</span><select key={`website-${defaults.websiteType}`} name="websiteType" defaultValue={defaults.websiteType} required aria-invalid={invalid("websiteType")}><option value="" disabled>{t.selectWebsite}</option>{websiteTypes.map((item) => <option key={item.value} value={item.value}>{optionLabel(item, language)}</option>)}</select>{error("websiteType")}</label>
      <label><span>{t.businessType} *</span><select key={`business-${defaults.businessType}`} name="businessType" defaultValue={defaults.businessType} required aria-invalid={invalid("businessType")}><option value="" disabled>{t.selectBusiness}</option>{businessTypes.map((item) => <option key={item.value} value={item.value}>{optionLabel(item, language)}</option>)}</select>{error("businessType")}</label>
      <label><span>{t.goal} *</span><select key={`goal-${defaults.goal}`} name="goal" defaultValue={defaults.goal} required aria-invalid={invalid("goal")}><option value="" disabled>{t.selectGoal}</option>{projectGoals.map((item) => <option key={item.value} value={item.value}>{optionLabel(item, language)}</option>)}</select>{error("goal")}</label>
      <label><span>{t.budget} *</span><select name="budget" defaultValue="" required aria-invalid={invalid("budget")}><option value="" disabled>{t.selectBudget}</option>{budgetOptions.map((item) => <option key={item.value} value={item.value}>{optionLabel(item, language)}</option>)}</select>{error("budget")}</label>
      <button className="button button-primary phase-next" type="button" onClick={continueToContact}>{t.continue} <Arrow /></button>
    </fieldset>
    <fieldset className={`inquiry-phase ${phase === 2 ? "active" : ""}`} aria-hidden={enhanced && phase !== 2} disabled={status === "submitting"}>
      <legend>{t.details}</legend>
      <label><span>{t.name} *</span><input name="name" autoComplete="name" required maxLength={100} placeholder={t.namePlaceholder} aria-invalid={invalid("name")} />{error("name")}</label>
      <label><span>{t.email} *</span><input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={160} placeholder="you@company.com" aria-invalid={invalid("email")} />{error("email")}</label>
      <label><span>{t.phone}</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} placeholder="+51 000 000 000" /></label>
      <label><span>{t.company}</span><input name="company" autoComplete="organization" maxLength={120} placeholder={t.companyPlaceholder} /></label>
      <label className="full"><span>{t.message} *</span><textarea name="message" rows={5} required maxLength={3000} placeholder={t.messagePlaceholder} aria-invalid={invalid("message")} />{error("message")}</label>
      <div className="form-submit full"><button className="phase-back" type="button" onClick={() => setPhase(1)}>← {t.back}</button><button className="button button-primary" type="submit" disabled={status === "submitting"}>{status === "submitting" ? t.sending : t.submit} <Arrow /></button></div>
    </fieldset>
    <p className={`inquiry-status ${status === "error" ? "error" : ""}`} role={status === "error" ? "alert" : undefined} aria-live="polite">{statusMessage || t.required}</p>
  </form>;
}
