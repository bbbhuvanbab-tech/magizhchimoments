/*
# Fix Security Issues

## Summary
Fixes five security vulnerabilities identified in the Supabase project:
1. Enquiries RLS policy `Public can submit enquiries` was `FOR ALL` with `WITH CHECK (true)`,
   allowing anon/authenticated to SELECT, UPDATE, and DELETE all enquiries — not just INSERT.
2. The `portfolio` storage bucket (public) had a broad SELECT policy allowing anyone to LIST
   all files in the bucket. Public buckets serve objects via public URLs without needing this.
3. The `has_role` function was `SECURITY DEFINER` and executable by `anon` and `authenticated`,
   allowing any anonymous client to probe whether any user ID has admin privileges.
4. Leaked password protection cannot be toggled via SQL — requires Dashboard action (noted separately).

## Changes

### 1. Enquiries table RLS policies
- Dropped `Public can submit enquiries` (was `FOR ALL`, `WITH CHECK true` — allowed public
  SELECT/UPDATE/DELETE on all enquiries).
- Created `Public can submit enquiries` as `FOR INSERT` only, `WITH CHECK (true)` scoped to
  `anon, authenticated`. This is the correct minimal permission for a public contact form.
- Dropped duplicate `Admins can view enquiries` (redundant with `Admins can view all enquiries`,
  both SELECT for authenticated admins).
- Added `Admins can delete enquiries` (`FOR DELETE`, authenticated, admin check) so admins
  retain delete capability after removing the over-broad FOR ALL policy.

### 2. Storage objects — portfolio bucket
- Dropped `Public can view portfolio images` SELECT policy on `storage.objects`.
  The `portfolio` bucket is already `public = true`, so objects are accessible via their
  public URLs without any RLS SELECT policy. Removing this prevents anonymous file listing.

### 3. has_role function
- Revoked `EXECUTE` from `PUBLIC` and `anon` so anonymous clients cannot call the function
  via `/rest/v1/rpc/has_role` to probe arbitrary user IDs for admin status.
- Granted `EXECUTE` to `authenticated` only, since all RLS policies using `has_role` are
  scoped `TO authenticated`.
- Kept `SECURITY DEFINER` to avoid infinite RLS recursion (the `user_roles` table has a
  policy that itself calls `has_role`; switching to `SECURITY INVOKER` would cause
  recursive policy evaluation).

## Security
- Enquiries: public can only INSERT (submit forms). Only authenticated admins can
  SELECT, UPDATE, and DELETE enquiries.
- Storage: public can access portfolio images via direct URLs but cannot list bucket
  contents.
- has_role: only authenticated users can execute; anon probing is blocked.

## Notes
1. **Leaked Password Protection** is a GoTrue (Supabase Auth) server configuration,
   not a database setting. It must be enabled in the Supabase Dashboard:
   Authentication → Providers → Email → Leaked Password Protection → Enable.
   This cannot be done via SQL.
2. The `has_role` function remains `SECURITY DEFINER` intentionally. Switching to
   `SECURITY INVOKER` would cause infinite recursion because the `user_roles` SELECT
   policy `Admins can view all roles` calls `has_role` in its `USING` clause.
3. The frontend does not call `has_role` via RPC — it queries `user_roles` directly —
   so revoking anon execute does not break any client code.
*/

-- =========================================================
-- 1. Fix enquiries RLS policies
-- =========================================================

-- Drop the over-broad FOR ALL policy
DROP POLICY IF EXISTS "Public can submit enquiries" ON enquiries;

-- Recreate as INSERT-only (public contact form)
CREATE POLICY "Public can submit enquiries"
ON enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Drop duplicate SELECT policy (keep "Admins can view all enquiries")
DROP POLICY IF EXISTS "Admins can view enquiries" ON enquiries;

-- Add DELETE policy for admins (was previously covered by the FOR ALL policy)
DROP POLICY IF EXISTS "Admins can delete enquiries" ON enquiries;
CREATE POLICY "Admins can delete enquiries"
ON enquiries FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'::app_role
  )
);

-- =========================================================
-- 2. Fix storage — remove broad SELECT on portfolio bucket
-- =========================================================

DROP POLICY IF EXISTS "Public can view portfolio images" ON storage.objects;

-- =========================================================
-- 3. Fix has_role function — restrict EXECUTE to authenticated
-- =========================================================

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
