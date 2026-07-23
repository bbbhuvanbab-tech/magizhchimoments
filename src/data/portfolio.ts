import { supabase } from '../integrations/supabase/client';

export interface PortfolioImage {
  url: string;
  alt: string;
  category: string;
  name: string;
}

import wedding1 from '../assets/wedding-1.jpg';
import wedding2 from '../assets/wedding-2.jpg';
import wedding3 from '../assets/wedding-3.jpg';
import wedding4 from '../assets/wedding-4.jpg';
import wedding5 from '../assets/wedding-5.jpg';
import wedding6 from '../assets/wedding-6.jpg';
import wedding7 from '../assets/wedding-7.jpg';
import wedding8 from '../assets/wedding-8.jpg';
import wedding9 from '../assets/wedding-9.jpg';
import wedding11 from '../assets/wedding-11.jpg';
import wedding12 from '../assets/wedding-12.jpg';
import wedding13 from '../assets/wedding-13.jpg';
import wedding14 from '../assets/wedding-14.jpg';
import wedding15 from '../assets/wedding-15.jpg';
import wedding16 from '../assets/wedding-16.jpg';

import engagement1 from '../assets/engagement-1.jpg';
import engagement2 from '../assets/engagement-2.jpg';
import engagement3 from '../assets/engagement-3.jpg';
import engagement4 from '../assets/engagement-4.jpg';
import engagement5 from '../assets/engagement-5.jpg';
import engagement6 from '../assets/engagement-6.jpg';
import engagement7 from '../assets/engagement-7.jpg';
import engagement8 from '../assets/engagement-8.jpg';
import engagement9 from '../assets/engagement-9.jpg';
import engagement10 from '../assets/engagement-10.jpg';
import engagement11 from '../assets/engagement-11.jpg';
import engagement12 from '../assets/engagement-12.jpg';
import engagement13 from '../assets/engagement-13.jpg';
import engagement14 from '../assets/engagement-14.jpg';
import engagement15 from '../assets/engagement-15.jpg';

import birthday1 from '../assets/birthday-1.jpg';
import birthday2 from '../assets/birthday-2.jpg';
import birthday3 from '../assets/birthday-3.jpg';
import birthday4 from '../assets/birthday-4.jpg';
import birthday5 from '../assets/birthday-5.jpg';
import birthday6 from '../assets/birthday-6.jpg';
import birthday7 from '../assets/birthday-7.jpg';
import birthday8 from '../assets/birthday-8.jpg';
import birthday9 from '../assets/birthday-9.jpg';
import birthday10 from '../assets/birthday-10.jpg';
import birthday11 from '../assets/birthday-11.jpg';
import birthday12 from '../assets/birthday-12.jpg';
import birthday13 from '../assets/birthday-13.jpg';
import birthday14 from '../assets/birthday-14.jpg';
import birthday15 from '../assets/birthday-15.jpg';
import birthday16 from '../assets/birthday-16.jpg';

import baby1 from '../assets/baby-1.jpg';
import baby2 from '../assets/baby-2.jpg';
import baby3 from '../assets/baby-3.jpg';
import baby4 from '../assets/baby-4.jpg';
import baby5 from '../assets/baby-5.jpg';
import baby6 from '../assets/baby-6.jpg';

const localFallback = {
  weddings: [
    wedding1, wedding2, wedding3, wedding4, wedding5, wedding6,
    wedding7, wedding8, wedding9, wedding11, wedding12, wedding13,
    wedding14, wedding15, wedding16,
  ].map((src, i) => ({ src, alt: `Wedding ${i + 1}`, category: 'Wedding', name: `wedding-${i + 1}` })),
  engagements: [
    engagement1, engagement2, engagement3, engagement4, engagement5,
    engagement6, engagement7, engagement8, engagement9, engagement10,
    engagement11, engagement12, engagement13, engagement14, engagement15,
  ].map((src, i) => ({ src, alt: `Engagement ${i + 1}`, category: 'engagement', name: `engagement-${i + 1}` })),
  birthdays: [
    birthday1, birthday2, birthday3, birthday4, birthday5, birthday6,
    birthday7, birthday8, birthday9, birthday10, birthday11, birthday12,
    birthday13, birthday14, birthday15, birthday16,
  ].map((src, i) => ({ src, alt: `Birthday ${i + 1}`, category: 'birthday', name: `birthday-${i + 1}` })),
  babyShowers: [
    baby1, baby2, baby3, baby4, baby5, baby6,
  ].map((src, i) => ({ src, alt: `Baby Shower ${i + 1}`, category: 'baby shower', name: `baby-${i + 1}` })),
};

const CATEGORY_MAP: Record<string, keyof typeof localFallback> = {
  'wedding': 'weddings',
  'engagement': 'engagements',
  'birthday': 'birthdays',
  'baby_shower': 'babyShowers',
};

export const fetchPortfolioImages = async () => {
  const results = {
    weddings: [] as PortfolioImage[],
    engagements: [] as PortfolioImage[],
    babyShowers: [] as PortfolioImage[],
    birthdays: [] as PortfolioImage[],
  };

  const { data, error } = await supabase
    .from('portfolio_images')
    .select('category, image_url, alt_text')
    .order('order_index', { ascending: true });

  if (!error && data && data.length > 0) {
    for (const row of data) {
      const key = CATEGORY_MAP[row.category];
      if (!key) continue;
      results[key].push({
        url: row.image_url,
        alt: row.alt_text || row.category,
        category: row.category,
        name: row.alt_text || row.category,
      });
    }
  }

  for (const key of Object.keys(results) as (keyof typeof results)[]) {
    if (results[key].length === 0) {
      results[key] = localFallback[key] as PortfolioImage[];
    }
  }

  return results;
};

export const fetchAllPortfolioImages = async (): Promise<PortfolioImage[]> => {
  const categorized = await fetchPortfolioImages();
  return [
    ...categorized.weddings,
    ...categorized.engagements,
    ...categorized.babyShowers,
    ...categorized.birthdays,
  ];
};
