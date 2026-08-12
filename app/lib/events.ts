export type StudioEventName =
  | "contact_form_started"
  | "contact_form_submitted"
  | "whatsapp_clicked"
  | "vanta_live_demo_clicked"
  | "case_study_clicked";

export function trackStudioEvent(name: StudioEventName, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ahpixel:analytics", { detail: { name, ...detail } }));
}
