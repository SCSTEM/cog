import { Hono } from "hono";
import { verifySlack } from "./middleware";
import { serveStatic } from "hono/serve-static.module";
import { Bot } from "./bot";
import { Webhooks } from "./webhooks";

/*

Initialization

*/
const app = new Hono();

app.route("/api/slack", Bot).use(verifySlack);
app.route(`/api/hook/${WEBHOOK_KEY}`, Webhooks);

/*

Root handlers handlers and routes

*/

app.get("/static/*", serveStatic({ root: "./" }));
app.get("/favicon.ico", serveStatic({ root: "./favicon.ico" }));

export default app;
