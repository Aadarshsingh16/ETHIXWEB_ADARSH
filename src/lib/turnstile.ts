import { HttpError } from "./http";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstile(token: string, remoteip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    // If no secret is configured (e.g. dev environment without Cloudflare keys), permit for offline dev
    if (process.env.NODE_ENV === "development") {
      return true;
    }
    throw new HttpError(500, "config_error", "Turnstile secret key missing");
  }

  // Cloudflare development test tokens
  if (
    token === "1x00000000000000000000AA" ||
    secret === "1x0000000000000000000000000000000AA"
  ) {
    // Dummy token passes for local dev
    return true;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (remoteip) {
      formData.append("remoteip", remoteip);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!res.ok) {
      return false;
    }

    const data = (await res.json()) as TurnstileVerifyResponse;
    return !!data.success;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}
