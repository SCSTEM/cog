import { Message, Blocks, Button } from "slack-block-builder";
import { GetInvolvedPayload } from "../types";

export default (data: Partial<GetInvolvedPayload>) =>
  Message({ channel: data.channel })
    .blocks(
      Blocks.Header({
        text: "🎉 A new Get Involved Form response has been received!",
      }),
      Blocks.Divider(),
      Blocks.Section({ text: `*${data.name}* (${data.email})` }).fields([
        "*Area of Interest*",
        data.interest,
        `*"How did you hear about us?"*`,
        data.source,
      ]),
      Blocks.Divider(),
      Blocks.Section({ text: "View all responses" }).accessory(
        Button({ text: "Google Sheets", url: data.sheetUrl }).primary(true)
      )
    )
    .getBlocks();
