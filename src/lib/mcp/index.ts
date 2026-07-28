import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listEnquiriesTool from "./tools/list-enquiries";
import updateEnquiryStatusTool from "./tools/update-enquiry-status";
import enquirySummaryTool from "./tools/enquiry-summary";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "magizhchi-moments-mcp",
  title: "Magizhchi Moments",
  version: "0.1.0",
  instructions:
    "Tools for the Magizhchi Moments event decor studio. Use `list_enquiries` to read client enquiries from the website contact form, `enquiry_summary` for an overview by status and event type, and `update_enquiry_status` to move an enquiry through the pipeline. All tools act as the signed-in admin user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listEnquiriesTool, enquirySummaryTool, updateEnquiryStatusTool],
});