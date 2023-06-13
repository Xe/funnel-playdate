import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const resp = await ctx.next();
  resp.headers.set("Access-Control-Allow-Origin", "*");
  return resp;
}