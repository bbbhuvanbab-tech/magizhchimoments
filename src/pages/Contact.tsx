import { useState } from "react";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", event: "", date: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("enquiries").insert({
      name: form.name,
      phone: form.phone || null,
      email: form.email,
      event_type: form.event || null,
      event_date: form.date || null,
      message: form.message,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("Thank you — we'll be in touch within 48 hours.");
    setForm({ name: "", phone: "", email: "", event: "", date: "", message: "" });
  };

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Begin Your Story"
          subtitle="Tell us about the celebration you're imagining. We respond personally to every enquiry within 48 hours."
        />

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 max-w-6xl mx-auto">
          <div className="md:col-span-2 space-y-8">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Reach Us</p>
              <h3 className="font-serif text-2xl text-foreground mb-6">By appointment only</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our atelier accepts a limited number of celebrations each season. Share a few details and we'll arrange a private consultation.
              </p>
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Email</p>
                  <p className="text-foreground">hello@magizhchimoments.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Phone</p>
                  <p className="text-foreground">+91 8015479682</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Instagram</p>
                  <p className="text-foreground">@magizhchimoments</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Studio</p>
                  <p className="text-foreground">Chennai, India</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="md:col-span-3 border border-border/40 p-8 md:p-12 space-y-6 bg-card/30">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Your name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Event Type</label>
                <select value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })}
                  className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth">
                  <option value="" className="bg-background">Select…</option>
                  <option value="Wedding" className="bg-background">Wedding</option>
                  <option value="Engagement" className="bg-background">Engagement</option>
                  <option value="Baby Shower" className="bg-background">Baby Shower</option>
                  <option value="Birthday" className="bg-background">Birthday</option>
                  <option value="Other" className="bg-background">Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Event Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth" />
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Tell us your story</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth resize-none" />
            </div>
            <button type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-gold text-primary-foreground text-xs tracking-[0.3em] uppercase hover-gold-glow transition-smooth disabled:opacity-60">
              {submitting ? "Sending…" : "Send Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;