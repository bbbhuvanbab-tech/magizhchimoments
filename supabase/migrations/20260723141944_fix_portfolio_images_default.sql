/*
# Fix portfolio_images.created_by default

## Summary
The `portfolio_images` table has an INSERT RLS policy requiring `auth.uid() = created_by`,
but the `created_by` column has no default. Admin uploads that omit `created_by` fail
the RLS check. This adds `DEFAULT auth.uid()` so inserts work without the client
passing it explicitly.

## Changes
- ALTER `portfolio_images.created_by` to `DEFAULT auth.uid()`.
*/

ALTER TABLE portfolio_images
  ALTER COLUMN created_by SET DEFAULT auth.uid();
