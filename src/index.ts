import { Hono } from "hono";
import { slackRouter } from "./slack";

const router = new Hono();

router.route("/api/slack", slackRouter);

router.fire();
