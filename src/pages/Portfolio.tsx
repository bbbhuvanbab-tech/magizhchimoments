import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CATEGORIES = ['Wedding', 'engagement', 'birthday', 'baby shower'];

interface PortfolioImage {
  name: string;
  url: string;
  category: string;
}

export default function Portfolio() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllImages();
  }, []);

  const fetchAllImages = async () => {
    setLoading(true);
    const allImages: PortfolioImage[] = [];

    for (const category of CATEGORIES) {
      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .list(category, { limit: 100 });

      if (error || !data) continue;

      const categoryImages = data
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .map(file => ({
          name: file.name,
          category,
        url: `https://mwklngfmvalxwjdomtxa.supabase.co/storage/v1/object/public/portfolio-images/${category.replace(/ /g, '%20')}/${file.name.replace(/ /g, '%20')}`
        }));

      allImages.push(...categoryImages);
    }

    setImages(allImages);
    setLoading(false);
  };

  const filtered = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  const tabs = ['All', ...CATEGORIES];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-center text-4xl font-light tracking-widest text-gold-400 mb-4">
        PORTFOLIO
      </h1>
      <p className="text-center text-white/50 mb-12 tracking-wider">
        A glimpse into the moments we've crafted
      </p>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`px-6 py-2 text-sm tracking-widest uppercase border transition-all duration-300 ${
              activeCategory === tab
                ? 'border-yellow-600 text-yellow-600'
                : 'border-white/20 text-white/50 hover:border-white/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center text-white/40 tracking-widest">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-white/40 tracking-widest">No images yet</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {filtered.map((img, i) => (
            <div key={i} className="overflow-hidden aspect-square group">
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}