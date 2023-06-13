import { HandlerContext } from "$fresh/server.ts";
import { getClients } from "../../utils/client.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Response => {
  return new Response(JSON.stringify({ clients: await getClients() }));
};
