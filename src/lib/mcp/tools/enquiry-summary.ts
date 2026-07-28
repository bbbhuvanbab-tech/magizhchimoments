import { defineTool } from "@lovable.dev/mcp-js";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "enquiry_summary",
  title: "Enquiry summary",
  description:
    "Summarise all enquiries by status and event type, with the date of the most recent enquiry. Requires an admin account.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated;

    const { data, error } = await supabaseForUser(ctx)
      .from("enquiries")
      .select("status, event_type, created_at")
      .order("created_at", { ascending: false });

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const rows = data ?? [];
    const byStatus: Record<string, number> = {};
    const byEventType: Record<string, number> = {};
    for (const row of rows) {
      const status = row.status ?? "Unknown";
      const eventType = row.event_type ?? "Unspecified";
      byStatus[status] = (byStatus[status] ?? 0) + 1;
      byEventType[eventType] = (byEventType[eventType] ?? 0) + 1;
    }

    const summary = {
      total: rows.length,
      byStatus,
      byEventType,
      latestEnquiryAt: rows[0]?.created_at ?? null,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: summary,
    };
  },
});