export interface PortfolioImage {
  url: string;
  alt: string;
  category: string;
  name: string;
}

import wedding1 from '../assets/wedding-1.jpg';
import wedding2 from '../assets/wedding-2.jpg';
import wedding3 from '../assets/wedding-3.jpg';
import wedding14 from '../assets/wedding-14.jpg';
import wedding15 from '../assets/wedding-15.jpg';
import wedding16 from '../assets/wedding-16.jpg';

import engagement1 from '../assets/engagement-1.jpg';
import engagement2 from '../assets/engagement-2.jpg';
import engagement3 from '../assets/engagement-3.jpg';
import engagement4 from '../assets/engagement-4.jpg';
import engagement9 from '../assets/engagement-9.jpg';
import engagement10 from '../assets/engagement-10.jpg';
import engagement11 from '../assets/engagement-11.jpg';
import engagement12 from '../assets/engagement-12.jpg';
import engagement13 from '../assets/engagement-13.jpg';
import engagement14 from '../assets/engagement-14.jpg';
import engagement15 from '../assets/engagement-15.jpg';

import birthday8 from '../assets/birthday-8.jpg';
import birthday9 from '../assets/birthday-9.jpg';
import birthday10 from '../assets/birthday-10.jpg';
import birthday11 from '../assets/birthday-11.jpg';
import birthday12 from '../assets/birthday-12.jpg';
import birthday13 from '../assets/birthday-13.jpg';
import birthday14 from '../assets/birthday-14.jpg';
import birthday15 from '../assets/birthday-15.jpg';
import birthday16 from '../assets/birthday-16.jpg';

import baby5 from '../assets/baby-5.jpg';
import baby6 from '../assets/baby-6.jpg';

const assetMap: Record<string, string> = {
  'wedding-1.jpg': wedding1,
  'wedding-2.jpg': wedding2,
  'wedding-3.jpg': wedding3,
  'wedding-14.jpg': wedding14,
  'wedding-15.jpg': wedding15,
  'wedding-16.jpg': wedding16,
  'engagement-1.jpg': engagement1,
  'engagement-2.jpg': engagement2,
  'engagement-3.jpg': engagement3,
  'engagement-4.jpg': engagement4,
  'engagement-9.jpg': engagement9,
  'engagement-10.jpg': engagement10,
  'engagement-11.jpg': engagement11,
  'engagement-12.jpg': engagement12,
  'engagement-13.jpg': engagement13,
  'engagement-14.jpg': engagement14,
  'engagement-15.jpg': engagement15,
  'birthday-8.jpg': birthday8,
  'birthday-9.jpg': birthday9,
  'birthday-10.jpg': birthday10,
  'birthday-11.jpg': birthday11,
  'birthday-12.jpg': birthday12,
  'birthday-13.jpg': birthday13,
  'birthday-14.jpg': birthday14,
  'birthday-15.jpg': birthday15,
  'birthday-16.jpg': birthday16,
  'baby-5.jpg': baby5,
  'baby-6.jpg': baby6,
};

const localFallback = {
  weddings: [
    wedding1, wedding2, wedding3,
    wedding14, wedding15, wedding16,
  ].map((src, i) => ({ url: src, alt: `Wedding ${i + 1}`, category: 'Wedding', name: `wedding-${i + 1}` })),
  engagements: [
    engagement1, engagement2, engagement3, engagement4,
    engagement9, engagement10,
    engagement11, engagement12, engagement13, engagement14, engagement15,
  ].map((src, i) => ({ url: src, alt: `Engagement ${i + 1}`, category: 'engagement', name: `engagement-${i + 1}` })),
  birthdays: [
    birthday8, birthday9, birthday10, birthday11, birthday12,
    birthday13, birthday14, birthday15, birthday16,
  ].map((src, i) => ({ url: src, alt: `Birthday ${i + 1}`, category: 'birthday', name: `birthday-${i + 1}` })),
  babyShowers: [
    baby5, baby6,
  ].map((src, i) => ({ url: src, alt: `Baby Shower ${i + 1}`, category: 'baby shower', name: `baby-${i + 1}` })),
};

export const fetchPortfolioImages = async () => {
  return localFallback;
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
