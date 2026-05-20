import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "@/components/SectionHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Enquiry = {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  event_type: string | null;
  event_date: string | null;
  message: string;
  created_at: string;
};

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setEnquiries(data as Enquiry[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Admin"
          title="Enquiries"
          subtitle={`${enquiries.length} total enquir${enquiries.length === 1 ? "y" : "ies"}, latest first.`}
        />
        <div className="border border-border/40 bg-card/30 overflow-x-auto">
          {loading ? (
            <p className="p-8 text-muted-foreground">Loading…</p>
          ) : enquiries.length === 0 ? (
            <p className="p-8 text-muted-foreground">No enquiries yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Received</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(e.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.email}</TableCell>
                    <TableCell>{e.phone || "—"}</TableCell>
                    <TableCell>{e.event_type || "—"}</TableCell>
                    <TableCell className="whitespace-nowrap">{e.event_date || "—"}</TableCell>
                    <TableCell className="max-w-md whitespace-pre-wrap text-sm">{e.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiries;