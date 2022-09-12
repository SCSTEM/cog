import { Context, Hono } from "hono";
import { verifySlack } from "./middleware";

export const slackRouter = new Hono().use(verifySlack);

// https://api.slack.com/messaging/interactivity#components
const interactHandler = async (ctx: Context) => {
  return ctx.text("Not implemented");
};

// https://api.slack.com/reference/block-kit/block-elements#external_select
const selectOptionsHandler = async (ctx: Context) => {
  return ctx.text("Not implemented");
};

// https://api.slack.com/interactivity/slash-commands
const slashHandler = async (ctx: Context) => {
  return ctx.text(`${ctx.req.param("command")}`);
};

// https://api.slack.com/apis/connections/events-api
const eventHandler = async (ctx: Context) => {
  const body = await ctx.req.parseBody()

  if (c
  return ctx.text("Not implemented");
};

slackRouter
  .post("/interact", interactHandler)
  .post("/select-options", selectOptionsHandler)
  .post("/slash/:command", slashHandler)
  .post("/events", eventHandler);
