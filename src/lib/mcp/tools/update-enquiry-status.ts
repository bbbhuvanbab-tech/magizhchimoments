import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_enquiry_status",
  title: "Update enquiry status",
  description:
    "Update the status of a single enquiry, for example to 'New', 'Contacted', 'Booked', or 'Closed'. Requires an admin account.",
  inputSchema: {
    id: z.string().describe("The enquiry id."),
    status: z.string().trim().min(1).describe("The new status value."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, status }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated;

    const { data, error } = await supabaseForUser(ctx)
      .from("enquiries")
      .update({ status })
      .eq("id", id)
      .select("id, name, status")
      .maybeSingle();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data)
      return {
        content: [{ type: "text", text: "No enquiry was updated — check the id and your permissions." }],
        isError: true,
      };

    return {
      content: [{ type: "text", text: `Enquiry ${data.id} (${data.name}) is now "${data.status}".` }],
      structuredContent: { enquiry: data },
    };
  },
});