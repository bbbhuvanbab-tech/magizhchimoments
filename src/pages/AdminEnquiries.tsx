import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setEnquiries(data as Enquiry[]);
      setLoading(false);
    })();
  }, [authLoading, user, isAdmin, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (authLoading) {
    return <div className="pt-40 text-center text-muted-foreground">Loading…</div>;
  }

  if (user && !isAdmin) {
    return (
      <div className="pt-32 md:pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-xl text-center space-y-6">
          <SectionHeader eyebrow="Restricted" title="Admins Only" subtitle="Your account does not have permission to view enquiries." />
          <button onClick={signOut} className="px-10 py-4 border border-border/60 text-foreground text-xs tracking-[0.3em] uppercase hover:border-primary transition-smooth">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-end mb-6">
          <button onClick={signOut} className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-smooth">
            Sign Out
          </button>
        </div>
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