import React from 'react';

/**
 * SZE Gallery - rácsos képgaléria nagyító nézettel (lightbox)
 *
 * items: [{ src, thumb?, title?, description? }]
 *   - thumb: opcionális kisebb kép a rácsba; ha nincs, a src töltődik be ott is.
 *     A teljes méretű kép így csak a nagyítóban kell.
 *
 * A nagyító Esc-re, a háttérre kattintva vagy a bezáró gombbal zárul,
 * a ←/→ nyilakkal lapozható.
 */

const Gallery = ({ 
  items = [], 
  columns = 3,
  gap = 4,
  rounded = 'rounded-lg',
  className = '',
  onImageClick = null 
}) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    if (onImageClick) {
      onImageClick(image);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedImage(items[newIndex]);
      setSelectedIndex(newIndex);
    } else {
      const newIndex = items.length - 1;
      setSelectedImage(items[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedIndex < items.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedImage(items[newIndex]);
      setSelectedIndex(newIndex);
    } else {
      const newIndex = 0;
      setSelectedImage(items[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setSelectedIndex(null);
  };

  // Billentyűzet a nagyítóban: Esc bezár, nyilak lapoznak.
  // A kezelők minden rendereléskor frissek, ezért ref-en át érjük el őket.
  const keyHandlers = React.useRef({});
  keyHandlers.current = { Escape: handleClose, ArrowLeft: handlePrevious, ArrowRight: handleNext };
  const isOpen = selectedImage !== null;
  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => keyHandlers.current[e.key]?.();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[columns] || 'grid-cols-3';

  const gapClass = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }[gap] || 'gap-4';

  return (
    <>
      <div className={`grid ${gridColsClass} ${gapClass} ${className}`}>
        {items.map((item, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleImageClick(item, index)}
            aria-label={item.title ? `${item.title} megnyitása` : `${index + 1}. kép megnyitása`}
            className={`group block w-full cursor-pointer overflow-hidden ${rounded} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary focus-visible:ring-offset-2`}
          >
            <div className={`relative w-full aspect-square ${rounded} overflow-hidden border-2 border-sze-primary-100 transition-all duration-300 hover:border-sze-primary-300 hover:shadow-lg`}>
              <img
                src={item.thumb || item.src}
                alt={item.title || `${index + 1}. kép`}
                loading="lazy"
                className="w-full h-full object-cover bg-gray-100 transition-transform duration-300 group-hover:scale-110"
              />
              {/* Tailwind v4: az átlátszóság a színben van (bg-black/40); a régi
                  bg-opacity-* osztályokat a v4 már nem ismeri, így a sötétítés
                  korábban nem működött. */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                </div>
              </div>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-left text-white text-sm font-medium">{item.title}</p>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title || 'Kép nagyítva'}
        >
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full">
            {/* Image */}
            <div className="relative w-full aspect-video bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.title || 'Preview'}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title and Description */}
            {(selectedImage.title || selectedImage.description) && (
              <div className="bg-gray-900 border-t border-gray-800 p-4">
                {selectedImage.title && (
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.description && (
                  <p className="text-gray-300 text-sm">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            )}

            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-6">
              <button
                onClick={handlePrevious}
                className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm"
                aria-label="Előző kép"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm"
                aria-label="Következő kép"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
              {selectedIndex + 1} / {items.length}
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors duration-200 backdrop-blur-sm z-10"
              aria-label="Bezárás"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
