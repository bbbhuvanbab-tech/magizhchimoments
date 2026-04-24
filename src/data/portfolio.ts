import wedding1 from "@/assets/wedding-1.jpg";
import wedding2 from "@/assets/wedding-2.jpg";
import wedding3 from "@/assets/wedding-3.jpg";
import baby1 from "@/assets/baby-1.jpg";
import baby2 from "@/assets/baby-2.jpg";
import baby3 from "@/assets/baby-3.jpg";
import engagement1 from "@/assets/engagement-1.jpg";
import engagement2 from "@/assets/engagement-2.jpg";
import engagement3 from "@/assets/engagement-3.jpg";
import engagement4 from "@/assets/engagement-4.jpg";
import birthday1 from "@/assets/birthday-1.jpg";

export const weddings = [
  { src: wedding1, alt: "The Bridal Mandap" },
  { src: wedding2, alt: "Reception in Bloom" },
  { src: wedding3, alt: "An Ivory Vow" },
];

export const engagements = [
  { src: engagement1, alt: "The Promise" },
  { src: engagement2, alt: "Hands & Heirlooms" },
  { src: engagement3, alt: "Rose Wall Sanctuary" },
  { src: engagement4, alt: "Golden Hour" },
];

export const babyShowers = [
  { src: baby1, alt: "Pastel Reverie" },
  { src: baby2, alt: "Seemantham Ritual" },
  { src: baby3, alt: "Sweet Beginnings" },
];

export const birthdays = [
  { src: birthday1, alt: "Onyx & Gold Soirée" },
];

export const categories = [
  { name: "Weddings", slug: "weddings", items: weddings },
  { name: "Engagement", slug: "engagement", items: engagements },
  { name: "Baby Shower", slug: "baby-shower", items: babyShowers },
  { name: "Birthday", slug: "birthday", items: birthdays },
];