import { apiFetch } from "@/services/api";

export type GivingIntentPayload = {
  amount: number;
  currency: string;
  frequency: "one-time" | "recurring";
  category: string;
};

export async function createGivingIntent(payload: GivingIntentPayload) {
  return apiFetch("/giving/intent", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
