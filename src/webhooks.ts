import { Hono } from "hono";
import getInvolvedNotification from "./payloads/getInvolvedNotification";
import { GetInvolvedPayload } from "./types";
import { WebClient } from "@slack/web-api";

export const Webhooks = new Hono();

const slackClient = new WebClient(SLACK_BOT_TOKEN);

Webhooks.post("getInvolved", async (c) => {
  const body = await c.req.json<GetInvolvedPayload>();

  if (!body.channel) return c.json("No channel specified", 400);

  const blocks = getInvolvedNotification(body);

  const res = await slackClient.chat.postMessage({
    channel: body.channel,
    blocks: blocks,
  });

  if (!res.ok) return c.json(`Error posting chat message: ${res.error}`, 500);

  return c.json(`Message sucessfully sent at ${res.ts}`, 200);
});
