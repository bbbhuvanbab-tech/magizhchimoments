import { supabase } from "@/integrations/supabase/client";

export interface PortfolioImage {
  src: string;
  alt: string;
}

export async function fetchPortfolioImages() {
  const { data, error } = await supabase
    .from("portfolio_images")
    .select("image_url, alt_text, category")
    .order("category")
    .order("order_index");

  if (error) {
    console.error("Failed to fetch portfolio images:", error);
    return {
      weddings: [],
      engagements: [],
      babyShowers: [],
      birthdays: [],
    };
  }

  const images = data || [];
  const weddings: PortfolioImage[] = [];
  const engagements: PortfolioImage[] = [];
  const babyShowers: PortfolioImage[] = [];
  const birthdays: PortfolioImage[] = [];

  images.forEach((img) => {
    const item = { src: img.image_url, alt: img.alt_text || "" };
    switch (img.category) {
      case "wedding":
        weddings.push(item);
        break;
      case "engagement":
        engagements.push(item);
        break;
      case "baby_shower":
        babyShowers.push(item);
        break;
      case "birthday":
        birthdays.push(item);
        break;
    }
  });

  // Add fallback Cloudinary images if no wedding images
  if (weddings.length === 0) {
    weddings.push(
      { src: "https://res.cloudinary.com/dipoqbdit/image/upload/v1779877108/DSCF4081_d4av7v.jpg", alt: "" },
      { src: "https://res.cloudinary.com/dipoqbdit/image/upload/v1779877111/_SIV4748_chqu2y.jpg", alt: "" },
      { src: "https://res.cloudinary.com/dipoqbdit/image/upload/v1779877110/IMG_20230611_001623_m2krdk.jpg", alt: "" },
      { src: "https://res.cloudinary.com/dipoqbdit/image/upload/v1779877109/DSCF3578_iwxmbk.jpg", alt: "" },
      { src: "https://res.cloudinary.com/dipoqbdit/image/upload/v1779876176/IMG-20240122-WA0019_eepubz.jpg", alt: "" }
    );
  }

  return { weddings, engagements, babyShowers, birthdays };
}

export async function getCategories() {
  const images = await fetchPortfolioImages();
  return [
    { name: "Weddings", slug: "weddings", items: images.weddings },
    { name: "Engagement", slug: "engagement", items: images.engagements },
    { name: "Baby Shower", slug: "baby-shower", items: images.babyShowers },
    { name: "Birthday", slug: "birthday", items: images.birthdays },
  ];
}