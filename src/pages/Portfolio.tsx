import { useEffect, useState } from 'react';
import { fetchAllPortfolioImages } from '../data/portfolio';
import type { PortfolioImage } from '../data/portfolio';

const CATEGORIES = ['All', 'Wedding', 'engagement', 'birthday', 'baby shower'];

export default function Portfolio() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [activeCategory, setActiveCategory] = useState(
    new URLSearchParams(window.location.search).get('category') || 'All'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPortfolioImages().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  const filtered = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-32 pb-20">
      <p className="text-center font-serif text-4xl md:text-6xl text-gradient-gold leading-tight mb-12">
        A glimpse into the moments<br />we've crafted
      </p>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {CATEGORIES.map(tab => (
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
                alt={img.alt || img.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
