import { WebClient } from "@slack/web-api";
import { Hono, Context } from "hono";
import { verifySlack } from "./middleware";
import { serveStatic } from "hono/serve-static.module";

/*

Initialization

*/
const app = new Hono();
const slackApi = app.route("/api/slack").use(verifySlack);
const webhooks = app.route(`/api/hook/${WEBHOOK_KEY}`);

const slackClient = new WebClient(SLACK_BOT_TOKEN);

/*

Root handlers handlers and routes

*/

app.get("/static/*", serveStatic({ root: "./" }));
app.get("/favicon.ico", serveStatic({ root: "./favicon.ico" }));

/*

Webhook handlers and routes

*/

webhooks.post("getInvolved", async (ctx) => {
  return ctx.text("Not implemented");
});

/*

Slack handlers and routes

*/

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
  const body = await ctx.req.parseBody();

  return ctx.text("Not implemented");
};

slackApi.post("/interact", interactHandler);
slackApi.post("/select-options", selectOptionsHandler);
slackApi.post("/slash/:command", slashHandler);
slackApi.post("/events", eventHandler);

export default app;
