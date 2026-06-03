/*
  # Create portfolio images table

  1. New Tables
    - `portfolio_images`
      - `id` (uuid, primary key)
      - `category` (text) - 'wedding', 'engagement', 'birthday', 'baby_shower'
      - `image_url` (text) - Supabase Storage URL
      - `alt_text` (text) - Image description
      - `order_index` (integer) - Display order within category
      - `created_at` (timestamp)
      - `created_by` (uuid) - Admin who uploaded it
  2. Security
    - Enable RLS on `portfolio_images` table
    - Add policy for public SELECT (anyone can view)
    - Add policy for authenticated admins to INSERT/UPDATE/DELETE
*/

CREATE TABLE IF NOT EXISTS portfolio_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('wedding', 'engagement', 'birthday', 'baby_shower')),
  image_url text NOT NULL,
  alt_text text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view portfolio images"
  ON portfolio_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can upload images"
  ON portfolio_images
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own images"
  ON portfolio_images
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own images"
  ON portfolio_images
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE INDEX idx_portfolio_images_category ON portfolio_images(category);
CREATE INDEX idx_portfolio_images_order ON portfolio_images(category, order_index);
