import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_enquiries",
  title: "List enquiries",
  description:
    "List client enquiries submitted through the Magizhchi Moments contact form, newest first. Requires an admin account.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).optional().describe("Maximum number of enquiries to return (default 20)."),
    status: z.string().optional().describe("Filter by enquiry status, e.g. 'New'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, status }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated;

    let query = supabaseForUser(ctx)
      .from("enquiries")
      .select("id, name, email, phone, event_type, event_date, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);

    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { enquiries: data ?? [] },
    };
  },
});