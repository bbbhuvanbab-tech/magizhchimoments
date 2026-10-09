import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { validateEnquiry } from "@/lib/enquiry-validation";
import type { EnquiryErrors, EnquiryFields } from "@/lib/enquiry-validation";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import SectionHeader from "@/components/SectionHeader";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
const DatePicker = ({ value, onChange, invalid }: { value: string; onChange: (date: string) => void; invalid?: boolean }) => {
  const [open, setOpen] = useState(false);
  const selectedDate = value ? new Date(value) : undefined;

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      onChange(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`);
      setOpen(false);
    }
  };

  const displayDate = value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select date";

  return (
    <div className="relative">
      <Button
        variant="ghost"
        id="enquiry-date"
        aria-label="Event Date"
        aria-required="true"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? "date-error" : undefined}
        aria-expanded={open}
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth text-left h-auto justify-start rounded-none px-0 hover:bg-transparent"
      >
        {displayDate}
      </Button>
      {open && (
        <div
          className="absolute top-full mt-2 left-0 z-50 p-4 rounded-lg shadow-lg"
          style={{ backgroundColor: "#0a0a0a", borderColor: "#c9a84c", borderWidth: "1px" }}
        >
          <style>{`
            .rdp {
              --rdp-cell-size: 36px;
              --rdp-accent-color: #c9a84c;
              --rdp-background-color: transparent;
              font-size: 14px;
              margin: 0;
            }
            .rdp-months {
              gap: 0;
            }
            .rdp-month {
              width: 100%;
            }
            .rdp-caption {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.5rem 0.25rem;
              color: white;
              margin-bottom: 1rem;
            }
            .rdp-caption_label {
              font-weight: 500;
              color: white;
              flex: 1;
              text-align: center;
            }
            .rdp-head_cell {
              color: #999;
              font-weight: 600;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              padding: 0.5rem 0;
            }
            .rdp-cell {
              padding: 0;
            }
            .rdp-day {
              width: var(--rdp-cell-size);
              height: var(--rdp-cell-size);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 14px;
              transition: all 0.2s;
            }
            .rdp-day:hover:not(.rdp-day_disabled) {
              background-color: #1a1a1a;
              border-radius: 4px;
            }
            .rdp-day_selected:not([disabled]) {
              background-color: #c9a84c;
              color: #0a0a0a;
              font-weight: 600;
              border-radius: 4px;
            }
            .rdp-day_today:not(.rdp-day_selected) {
              font-weight: 600;
              color: #c9a84c;
            }
            .rdp-day_disabled {
              color: #444;
              opacity: 0.4;
            }
            .rdp-button {
              padding: 0;
              border: none;
              background: transparent;
              cursor: pointer;
              color: #c9a84c;
              font-size: 18px;
            }
            .rdp-button:hover {
              opacity: 0.8;
            }
          `}</style>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelectDate}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>
      )}
    </div>
  );
};

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", event: "", date: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const pending = useRef(false);
  const [errors, setErrors] = useState<EnquiryErrors>({});

  const updateField = (field: keyof typeof form, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (field in errors) {
      const nextErrors = validateEnquiry(next);
      setErrors((current) => ({ ...current, [field]: nextErrors[field as keyof EnquiryFields] }));
    }
  };
  const fieldError = (field: keyof EnquiryFields) => errors[field] ? (
    <p id={`${field}-error`} role="alert" className="mt-2 text-sm leading-5 text-primary">{errors[field]}</p>
  ) : null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending.current) return;
    const validation = validateEnquiry(form);
    setErrors(validation);
    if (Object.keys(validation).length) {
      document.getElementById(`enquiry-${Object.keys(validation)[0]}`)?.focus();
      return;
    }
    if (!e.currentTarget.reportValidity()) return;
    if (!isSupabaseConfigured) {
      toast.error("Service unavailable. Please try again later.");
      return;
    }
    pending.current = true;
    setSubmitting(true);
    try {
    const { error } = await supabase.from("enquiries").insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      event_type: form.event || null,
      event_date: form.date,
      message: form.message,
    });
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("Thank you for reaching out.", {
      description: (
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>Your enquiry has been received. We'll get back to you as soon as possible.</p>
          <p>We look forward to helping you bring your celebration to life.</p>
        </div>
      ),
      classNames: { title: "font-serif text-lg text-primary" },
      duration: 10000,
    });
    setForm({ name: "", phone: "", email: "", event: "", date: "", message: "" });
    setErrors({});
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[calc(var(--header-height,9rem)+2rem)] md:pt-[calc(var(--header-height,9rem)+2.5rem)] pb-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Begin Your Story"
          subtitle="Tell us about the celebration you're imagining. We'll get back to you as soon as possible."
        />

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 max-w-6xl mx-auto">
          <div className="md:col-span-2 space-y-8">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Reach Us</p>
              <h3 className="font-serif text-2xl text-foreground mb-6">By appointment only</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share a few details about your celebration, and we'll help bring your vision to life. Get in touch to discuss your event and arrange a consultation.
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
                  <p className="text-foreground">191x, 4th Main Rd,<br />Meenatchi Sundareswarar Koil,<br />Sadasiva Nagar, Madipakkam,<br />Chennai - 600091</p>
                </div>
              </div>
            </div>
          </div>

          <form noValidate onSubmit={submit} className="md:col-span-3 border border-border/40 p-8 md:p-12 space-y-6 bg-card/30">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="enquiry-name" className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Your name</label>
                <input required id="enquiry-name" aria-invalid={Boolean(errors.name) || undefined} aria-describedby={errors.name ? "name-error" : undefined} value={form.name} onChange={(e) => updateField("name", e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth" />
                {fieldError("name")}
              </div>
              <div>
                <label htmlFor="enquiry-email" className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Email</label>
                <input required type="email" id="enquiry-email" aria-invalid={Boolean(errors.email) || undefined} aria-describedby={errors.email ? "email-error" : undefined} value={form.email} onChange={(e) => updateField("email", e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth" />
                {fieldError("email")}
              </div>
              <div>
                <label htmlFor="enquiry-phone" className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Phone</label>
                <input required type="tel" autoComplete="tel" inputMode="tel" id="enquiry-phone" aria-invalid={Boolean(errors.phone) || undefined} aria-describedby={errors.phone ? "phone-error" : undefined} value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth" />
                {fieldError("phone")}
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
                <label htmlFor="enquiry-date" className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Event Date</label>
                <DatePicker value={form.date} onChange={(date) => updateField("date", date)} invalid={Boolean(errors.date)} />
                {fieldError("date")}
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Tell us your story</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth resize-none" />
            </div>
            <Button type="submit"
              disabled={submitting}
              className="h-auto rounded-none w-full sm:w-auto px-10 py-4 bg-gradient-gold text-primary-foreground text-xs tracking-[0.3em] uppercase hover-gold-glow transition-smooth disabled:opacity-60">
              {submitting ? "Sending…" : "Send Enquiry"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact
