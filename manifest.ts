import { Manifest } from "deno-slack-sdk/mod.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "Cog",
  description: "The gear that keeps SC2 moving",
  icon: "assets/sc2-logo.png",
  workflows: [],
  externalAuthProviders: [],
  outgoingDomains: [],
  botScopes: ["commands"],
});
