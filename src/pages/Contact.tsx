import { useState } from "react";
import { Mail, Phone, Instagram, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";

const DatePicker = ({ value, onChange }: { value: string; onChange: (date: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(value ? new Date(value) : new Date());

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const days = [];
  const firstDay = getFirstDayOfMonth(month);
  const daysCount = getDaysInMonth(month);

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysCount; i++) days.push(i);

  const handleSelectDay = (day: number) => {
    const newDate = new Date(month.getFullYear(), month.getMonth(), day);
    onChange(newDate.toISOString().split("T")[0]);
    setOpen(false);
  };

  const monthName = month.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const displayDate = value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select date";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth text-left"
      >
        {displayDate}
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-0 bg-background border border-border/40 rounded-lg p-4 shadow-lg z-50 w-72">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}
              className="p-1 hover:bg-card/50 rounded transition-smooth"
            >
              <ChevronLeft size={18} className="text-primary" />
            </button>
            <span className="text-sm font-medium text-foreground">{monthName}</span>
            <button
              type="button"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
              className="p-1 hover:bg-card/50 rounded transition-smooth"
            >
              <ChevronRight size={18} className="text-primary" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => (
              <button
                key={i}
                type="button"
                onClick={() => day && handleSelectDay(day)}
                disabled={!day}
                className={`h-8 text-sm rounded transition-smooth ${
                  !day
                    ? "text-muted-foreground/30"
                    : value === new Date(month.getFullYear(), month.getMonth(), day).toISOString().split("T")[0]
                    ? "bg-gradient-gold text-primary-foreground font-semibold"
                    : "text-foreground hover:bg-card/50"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", event: "", date: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      toast.error("Service unavailable. Please try again later.");
      return;
    }
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
                  <p className="text-foreground">magizhchimoments22@gmail.com</p>
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
                <DatePicker value={form.date} onChange={(date) => setForm({ ...form, date })} />
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