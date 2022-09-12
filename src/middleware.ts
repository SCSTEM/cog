import { Context, Next } from "hono";

// Verifies the request is coming from Slack
// See: https://api.slack.com/authentication/verifying-requests-from-slack
// Inspired by https://gist.github.com/phistrom/3d691a2b4845f9ec9421faaebddc0904
export const verifySlack = async (ctx: Context, next: Next) => {
  /* Setup Constants */
  const version = "v0"; // Currently always v0
  const timestamp = ctx.req.headers.get("X-Slack-Request-Timestamp");
  const body = ctx.req.text();
  const signature = hexToBytes(
    ctx.req.headers.get("X-Slack-Signature")?.substring(3) ?? ""
  );
  const authString = `${version}:${timestamp}:${body}`;

  /* Validate Signature */
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SLACK_SIGNING_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const verified = await crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    new TextEncoder().encode(authString)
  );

  if (verified) await next();
  ctx.res = new Response("Unauthorized", { status: 401 });
};

const hexToBytes = (hex: string) => {
  const bytes = new Uint8Array(hex.length / 2);

  for (let c = 0; c < hex.length; c += 2) {
    bytes[c / 2] = parseInt(hex.substring(c, 2), 16);
  }

  return bytes.buffer;
};
