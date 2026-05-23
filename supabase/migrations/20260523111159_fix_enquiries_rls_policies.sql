/*
  # Fix enquiries RLS policies for public submissions
  
  1. Security
    - Drop overly permissive policies
    - Create new policies that allow anonymous users to insert enquiries
    - Keep SELECT restricted to authenticated admins only
*/

DROP POLICY IF EXISTS "Anyone can submit enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Anyone can view enquiries" ON public.enquiries;

CREATE POLICY "Public can submit enquiries"
  ON public.enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all enquiries"
  ON public.enquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );
