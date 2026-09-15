import { weddingConfig } from "@/config/config";

export type Tally = { vishesh: number; gauravi: number };
export type Choice = "Vishesh" | "Gauravi";

const endpoint = weddingConfig.rsvp.submitUrl;

/** Records one anonymous vote in the TriviaResponses tab. */
export async function submitVote(questionId: string, answer: Choice): Promise<void> {
  if (!endpoint) throw new Error("no endpoint");
  // Identify the submission as trivia in BOTH the query string and the body so
  // the Apps Script can route it regardless of how it inspects the request.
  const url = `${endpoint}?type=trivia&sheet=TriviaResponses&questionId=${encodeURIComponent(
    questionId,
  )}&answer=${encodeURIComponent(answer)}`;
  const res = await fetch(url, {
    method: "POST",
    // Simple request: Apps Script accepts this without a CORS preflight.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      type: "trivia",
      sheet: "TriviaResponses",
      questionId,
      answer,
      submittedAt: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
}


function coerce(value: unknown): number {
  const n = typeof value === "string" ? Number(value) : typeof value === "number" ? value : 0;
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
}

/** Latest aggregate for a single question. Returns null when unavailable. */
export async function fetchTally(questionId: string): Promise<Tally | null> {
  if (!endpoint) return null;
  try {
    const url = `${endpoint}?type=trivia&action=results&questionId=${encodeURIComponent(questionId)}`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) return null;
    const raw: unknown = await res.json();
    const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
    const bucket = (
      data["results"] && typeof data["results"] === "object" ? data["results"] : data
    ) as Record<string, unknown>;
    const vishesh = coerce(bucket["Vishesh"] ?? bucket["vishesh"]);
    const gauravi = coerce(bucket["Gauravi"] ?? bucket["gauravi"]);
    if (!vishesh && !gauravi && !("Vishesh" in bucket || "vishesh" in bucket)) return null;
    return { vishesh, gauravi };
  } catch {
    return null;
  }
}

/** Whole-number split that always sums to 100. */
export function toPercentages(tally: Tally): { vishesh: number; gauravi: number } {
  const total = tally.vishesh + tally.gauravi;
  if (total <= 0) return { vishesh: 0, gauravi: 0 };
  const vishesh = Math.round((tally.vishesh / total) * 100);
  return { vishesh, gauravi: 100 - vishesh };
}
