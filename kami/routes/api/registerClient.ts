import { HandlerContext } from "$fresh/server.ts";
import { addClient, Client } from "../../utils/client.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body: Client = await req.json();
  await addClient(body);

  return new Response(JSON.stringify({ status: "ok" }));
};
