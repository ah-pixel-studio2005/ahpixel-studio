const limits = {
  name: 100,
  email: 255,
  phone: 40,
  company: 150,
  websiteType: 80,
  businessType: 100,
  goal: 150,
  budget: 80,
  message: 4000,
  language: 5,
  sourcePage: 300,
} as const;

type InquiryInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  websiteType: string;
  businessType: string;
  goal: string;
  budget: string;
  message: string;
  language: string;
  sourcePage: string;
  createdAt: string;
  startedAt: number;
  website?: string;
};

const attempts = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const MIN_COMPLETION_MS = 1500;

function clean(value: unknown, max: number) {
  return Array.from(String(value ?? ""), character => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127 ? " " : character;
  }).join("").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
}

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function hashIp(ip: string) {
  if (!ip) return null;
  const salt = process.env.RATE_LIMIT_SALT || "ahpixel-inquiry-rate-limit";
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter(timestamp => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  attempts.set(key, recent);
  return false;
}

function parseInquiry(body: Record<string, unknown>): InquiryInput {
  return {
    name: clean(body.name, limits.name),
    email: clean(body.email, limits.email).toLowerCase(),
    phone: clean(body.phone, limits.phone),
    company: clean(body.company, limits.company),
    websiteType: clean(body.websiteType, limits.websiteType),
    businessType: clean(body.businessType, limits.businessType),
    goal: clean(body.goal, limits.goal),
    budget: clean(body.budget, limits.budget),
    message: clean(body.message, limits.message),
    language: clean(body.language, limits.language) || "en",
    sourcePage: clean(body.sourcePage, limits.sourcePage),
    createdAt: clean(body.createdAt, 40),
    startedAt: Number(body.startedAt),
    website: clean(body.website, 200),
  };
}

function validationErrors(input: InquiryInput) {
  const errors: Record<string, string> = {};
  if (!input.name) errors.name = "Name is required.";
  if (!input.email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = "Email is invalid.";
  if (!input.websiteType) errors.websiteType = "Website type is required.";
  if (!input.businessType) errors.businessType = "Business type is required.";
  if (!input.goal) errors.goal = "Goal is required.";
  if (!input.budget) errors.budget = "Budget is required.";
  if (!input.message) errors.message = "Message is required.";
  if (input.language !== "en" && input.language !== "es") errors.language = "Language is invalid.";
  if (!input.sourcePage) errors.sourcePage = "Source page is required.";
  if (!input.createdAt || Number.isNaN(Date.parse(input.createdAt))) errors.createdAt = "Submission time is invalid.";
  return errors;
}

async function saveInquiry(input: InquiryInput, ipHash: string | null, userAgent: string) {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) throw new Error("Inquiry storage is not configured.");
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      company: input.company || null,
      website_type: input.websiteType,
      business_type: input.businessType,
      goal: input.goal,
      budget: input.budget,
      message: input.message,
      language: input.language,
      source_page: input.sourcePage,
      ip_hash: ipHash,
      user_agent: userAgent || null,
    }),
  });
  if (!response.ok) throw new Error(`Inquiry storage failed with status ${response.status}.`);
}

async function sendNotification(input: InquiryInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL || "ahpixel.studio@gmail.com";
  if (!apiKey) {
    console.warn("Inquiry saved, but RESEND_API_KEY is not configured.");
    return;
  }
  const phoneDigits = input.phone.replace(/\D/g, "");
  const phoneLink = phoneDigits ? `https://wa.me/${phoneDigits}` : "";
  const row = (label: string, value: string, href?: string) => `<tr><td style="padding:7px 14px 7px 0;color:#667085;vertical-align:top">${escapeHtml(label)}</td><td style="padding:7px 0;color:#101828">${href ? `<a href="${href}">${escapeHtml(value)}</a>` : escapeHtml(value || "—")}</td></tr>`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#101828"><h1 style="font-size:24px">New AHPixel inquiry</h1><table style="border-collapse:collapse;width:100%">${row("Name", input.name)}${row("Email", input.email, `mailto:${encodeURIComponent(input.email)}`)}${row("WhatsApp", input.phone, phoneLink)}${row("Company", input.company)}${row("Website type", input.websiteType)}${row("Business type", input.businessType)}${row("Main goal", input.goal)}${row("Budget", input.budget)}${row("Source page", input.sourcePage)}${row("Submission time", input.createdAt)}</table><h2 style="font-size:16px;margin-top:24px">Message</h2><p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(input.message)}</p></div>`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "AHPixel Website <onboarding@resend.dev>", to: [recipient], reply_to: input.email, subject: `New AHPixel inquiry — ${input.name}`, html }),
  });
  if (!response.ok) throw new Error(`Email notification failed with status ${response.status}.`);
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return json(400, { success: false, code: "invalid_request" });
    const body = await request.json() as Record<string, unknown>;
    const input = parseInquiry(body);
    if (input.website) return json(200, { success: true });
    if (!Number.isFinite(input.startedAt) || Date.now() - input.startedAt < MIN_COMPLETION_MS) return json(400, { success: false, code: "form_too_fast" });
    const errors = validationErrors(input);
    if (Object.keys(errors).length) return json(400, { success: false, code: "validation_error", errors });
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
    const ipHash = await hashIp(forwarded);
    if (isRateLimited(ipHash || "unknown")) return json(429, { success: false, code: "rate_limited" });
    await saveInquiry(input, ipHash, clean(request.headers.get("user-agent"), 500));
    try {
      await sendNotification(input);
    } catch (error) {
      console.error("Inquiry email notification failed after database save.", error);
    }
    return json(200, { success: true });
  } catch (error) {
    console.error("Inquiry submission failed.", error);
    return json(500, { success: false, code: "server_error" });
  }
}
