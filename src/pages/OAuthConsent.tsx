import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "@/components/SectionHeader";

type AuthorizationDetails = {
  client?: { name?: string | null } | null;
  redirect_url?: string | null;
  redirect_to?: string | null;
};

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = `/auth?next=${encodeURIComponent(next)}`;
        return;
      }
      const { data, error: detailsError } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (detailsError) {
        setError(detailsError.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error: decideError } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (decideError) {
      setBusy(false);
      setError(decideError.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-md">
        {error ? (
          <>
            <SectionHeader eyebrow="Connection" title="Request Failed" subtitle={error} />
            <p className="text-xs text-center text-muted-foreground">
              This authorization request may have expired. Start the connection again from the app you were using.
            </p>
          </>
        ) : !details ? (
          <SectionHeader eyebrow="Connection" title="Loading…" />
        ) : (
          <>
            <SectionHeader
              eyebrow="Connection"
              title={`Connect ${details.client?.name ?? "an app"}`}
              subtitle={`This lets ${details.client?.name ?? "the app"} access Magizhchi Moments as you.`}
            />
            <div className="border border-border/40 p-8 space-y-4 bg-card/30">
              <button
                type="button"
                disabled={busy}
                onClick={() => decide(true)}
                className="w-full px-10 py-4 bg-gradient-gold text-primary-foreground text-xs tracking-[0.3em] uppercase hover-gold-glow transition-smooth disabled:opacity-60"
              >
                {busy ? "Please wait…" : "Approve"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => decide(false)}
                className="w-full px-10 py-4 border border-border/60 text-foreground text-xs tracking-[0.3em] uppercase hover:border-primary transition-smooth disabled:opacity-60"
              >
                Deny
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthConsent;