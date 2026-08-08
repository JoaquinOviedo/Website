import { getPublicEmail } from "@/content/portfolio";

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactDeliveryResult =
  | { kind: "sent" }
  | { kind: "mailto"; url: string };

/**
 * Delivery boundary for the contact form.
 *
 * Today it uses a configured public form endpoint when available and otherwise
 * returns a mailto fallback. A future first-party API can replace the endpoint
 * without changing the form component. Secrets must remain server-side.
 */
export async function deliverContactMessage(
  message: ContactMessage,
): Promise<ContactDeliveryResult> {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) throw new Error("Contact delivery failed");
    return { kind: "sent" };
  }

  const subject = encodeURIComponent(message.subject);
  const body = encodeURIComponent(
    `${message.message}\n\n${message.name} <${message.email}>`,
  );

  return {
    kind: "mailto",
    url: `mailto:${getPublicEmail()}?subject=${subject}&body=${body}`,
  };
}

