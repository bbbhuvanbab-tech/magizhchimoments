import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import SectionHeader from "@/components/SectionHeader";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin/enquiries", { replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin/enquiries` },
          });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success(mode === "signin" ? "Welcome back." : "Account created.");
    navigate("/admin/enquiries", { replace: true });
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin/enquiries`,
    });
    if (result.error) toast.error("Google sign-in failed.");
  };

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-md">
        <SectionHeader eyebrow="Admin" title="Sign In" />
        <form onSubmit={submit} className="border border-border/40 p-8 space-y-6 bg-card/30">
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6}
              className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-smooth" />
          </div>
          <button type="submit" disabled={submitting}
            className="w-full px-10 py-4 bg-gradient-gold text-primary-foreground text-xs tracking-[0.3em] uppercase hover-gold-glow transition-smooth disabled:opacity-60">
            {submitting ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
          <button type="button" onClick={google}
            className="w-full px-10 py-4 border border-border/60 text-foreground text-xs tracking-[0.3em] uppercase hover:border-primary transition-smooth">
            Continue with Google
          </button>
          <p className="text-xs text-center text-muted-foreground">
            {mode === "signin" ? "Need an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary hover:underline">
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;