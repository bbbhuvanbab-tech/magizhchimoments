import { supabase } from '../integrations/supabase/client';

export interface PortfolioImage {
  url: string;
  category: string;
  name: string;
}

const FOLDERS = ['Wedding', 'engagement', 'birthday', 'baby shower'];

const getPublicUrl = (folder: string, filename: string) => {
  return `https://mwklngfmvalxwjdomtxa.supabase.co/storage/v1/object/public/portfolio-images/${folder.replace(/ /g, '%20')}/${filename.replace(/ /g, '%20')}`;
};

export const fetchPortfolioImages = async () => {
  const results = {
    weddings: [] as PortfolioImage[],
    engagements: [] as PortfolioImage[],
    babyShowers: [] as PortfolioImage[],
    birthdays: [] as PortfolioImage[],
  };

  const folderMap: Record<string, keyof typeof results> = {
    'Wedding': 'weddings',
    'engagement': 'engagements',
    'baby shower': 'babyShowers',
    'birthday': 'birthdays',
  };

  for (const folder of FOLDERS) {
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .list(folder, { limit: 10 });

    if (error || !data) continue;

    const images = data
      .filter(f => f.name !== '.emptyFolderPlaceholder')
      .map(f => ({
        src: getPublicUrl(folder, f.name),
        alt: f.name.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
        category: folder,
        name: f.name,
      }));

    results[folderMap[folder]] = images;
  }

  return results;
};