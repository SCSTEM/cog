import { Hono, Context } from "hono";
import { WebClient } from "@slack/web-api";

export const Bot = new Hono();

// https://api.slack.com/messaging/interactivity#components
const interactHandler = async (c: Context) => {
  return c.text("Not implemented");
};

// https://api.slack.com/reference/block-kit/block-elements#external_select
const selectOptionsHandler = async (c: Context) => {
  return c.text("Not implemented");
};

// https://api.slack.com/interactivity/slash-commands
const slashHandler = async (c: Context) => {
  return c.text(`${c.req.param("command")}`);
};

// https://api.slack.com/apis/connections/events-api
const eventHandler = async (c: Context) => {
  const body = await c.req.parseBody();

  return c.text("Not implemented");
};

Bot.post("/interact", interactHandler);
Bot.post("/select-options", selectOptionsHandler);
Bot.post("/slash/:command", slashHandler);
Bot.post("/events", eventHandler);
