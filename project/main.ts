/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { cron } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import * as ts from "./utils/tailscale.ts";

cron("*/15 * * * * *", async () => {
  const client = await ts.fetchNodeInfo();
  await ts.registerClient(client);
});

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

await start(manifest, { plugins: [twindPlugin(twindConfig)], port: 3000 });
