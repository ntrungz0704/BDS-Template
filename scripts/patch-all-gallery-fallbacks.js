const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(process.cwd(), 'apps/marketplace/src/components/demo/templates'),
  path.join(process.cwd(), 'apps/website/src/components/templates')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let code = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. In MinimalTemplate: Ensure galleryList fallback
    if (file === 'MinimalTemplate.tsx') {
      const oldBlock = `<div className="h-80 sm:h-96 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={selectedProperty.gallery[activeGalleryIdx] || selectedProperty.image}
                  alt={selectedProperty.title}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {selectedProperty.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveGalleryIdx(i)}
                    className={\`h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition \${
                      activeGalleryIdx === i ? 'border-red-600' : 'border-transparent opacity-70 hover:opacity-100'
                    }\`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>`;

      const newBlock = `{(() => {
                const galleryList = (selectedProperty.gallery && selectedProperty.gallery.length >= 3)
                  ? selectedProperty.gallery
                  : [
                      selectedProperty.image || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
                      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
                      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
                    ];
                return (
                  <>
                    <div className="h-80 sm:h-96 rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={galleryList[activeGalleryIdx] || galleryList[0]}
                        alt={selectedProperty.title}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2.5">
                      {galleryList.map((img: string, i: number) => (
                        <div
                          key={i}
                          onClick={() => setActiveGalleryIdx(i)}
                          className={\`h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition \${
                            activeGalleryIdx === i ? 'border-red-600 ring-2 ring-red-300 scale-95 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }\`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}`;

      if (code.includes(oldBlock)) {
        code = code.replace(oldBlock, newBlock);
        modified = true;
        console.log(`[Patched MinimalTemplate] in ${path.basename(dir)}`);
      }
    }

    // 2. In CorporateTemplate: Ensure galleryList fallback
    if (file === 'CorporateTemplate.tsx') {
      const oldBlock = `<div className="h-80 sm:h-96 rounded-sm overflow-hidden bg-slate-100">
                <img
                  src={selectedProperty.gallery[activeGalleryIdx] || selectedProperty.image}
                  alt=""
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedProperty.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveGalleryIdx(i)}
                    className={\`h-24 rounded-sm overflow-hidden cursor-pointer border-2 transition \${
                      activeGalleryIdx === i ? 'border-amber-600' : 'border-transparent opacity-70 hover:opacity-100'
                    }\`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>`;

      const newBlock = `{(() => {
                const galleryList = (selectedProperty.gallery && selectedProperty.gallery.length >= 3)
                  ? selectedProperty.gallery
                  : [
                      selectedProperty.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
                      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
                      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
                      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
                    ];
                return (
                  <>
                    <div className="h-80 sm:h-96 rounded-sm overflow-hidden bg-slate-100">
                      <img
                        src={galleryList[activeGalleryIdx] || galleryList[0]}
                        alt=""
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2.5">
                      {galleryList.map((img: string, i: number) => (
                        <div
                          key={i}
                          onClick={() => setActiveGalleryIdx(i)}
                          className={\`h-20 rounded-sm overflow-hidden cursor-pointer border-2 transition \${
                            activeGalleryIdx === i ? 'border-amber-600 ring-2 ring-amber-300 scale-95 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }\`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}`;

      if (code.includes(oldBlock)) {
        code = code.replace(oldBlock, newBlock);
        modified = true;
        console.log(`[Patched CorporateTemplate] in ${path.basename(dir)}`);
      }
    }

    // 3. In LuxuryTemplate: Ensure galleryList fallback
    if (file === 'LuxuryTemplate.tsx') {
      const oldBlock = `<div className="h-80 md:h-[400px] rounded-lg overflow-hidden bg-slate-100 relative">
                <img
                  src={selectedProperty.gallery[activeImageIdx] || selectedProperty.image}
                  alt=""
                  className="w-full h-full object-cover transition duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-xs rounded shadow">
                    {selectedProperty.type}
                  </span>
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white font-bold text-xs rounded shadow">
                    {selectedProperty.direction}
                  </span>
                </div>
              </div>
              {selectedProperty.gallery && selectedProperty.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {selectedProperty.gallery.map((img: string, i: number) => (
                    <div
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={\`h-20 rounded overflow-hidden border-2 cursor-pointer transition \${activeImageIdx === i ? 'border-blue-600 scale-95' : 'border-slate-200 opacity-70 hover:opacity-100'}\`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}`;

      const newBlock = `{(() => {
                const galleryList = (selectedProperty.gallery && selectedProperty.gallery.length >= 3)
                  ? selectedProperty.gallery
                  : [
                      selectedProperty.image || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
                      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
                      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
                    ];
                const currentImg = galleryList[activeImageIdx] || galleryList[0];
                return (
                  <>
                    <div className="h-80 md:h-[400px] rounded-lg overflow-hidden bg-slate-100 relative">
                      <img
                        src={currentImg}
                        alt=""
                        className="w-full h-full object-cover transition duration-300"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-xs rounded shadow">
                          {selectedProperty.type}
                        </span>
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white font-bold text-xs rounded shadow">
                          {selectedProperty.direction}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2.5">
                      {galleryList.map((img: string, i: number) => (
                        <div
                          key={i}
                          onClick={() => setActiveImageIdx(i)}
                          className={\`h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition \${
                            activeImageIdx === i ? 'border-blue-600 ring-2 ring-blue-300 scale-95 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }\`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}`;

      if (code.includes(oldBlock)) {
        code = code.replace(oldBlock, newBlock);
        modified = true;
        console.log(`[Patched LuxuryTemplate] in ${path.basename(dir)}`);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, code, 'utf-8');
    }
  });
});

console.log('All gallery fallbacks patched successfully!');
