const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(process.cwd(), 'apps/marketplace/src/components/demo/templates'),
  path.join(process.cwd(), 'apps/website/src/components/templates')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;

  // 1. IndustrialTemplate
  const indPath = path.join(dir, 'IndustrialTemplate.tsx');
  if (fs.existsSync(indPath)) {
    let indCode = fs.readFileSync(indPath, 'utf-8');
    const oldInd = `<div className="space-y-3">
                <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-slate-900">
                  <img
                    src={selectedProperty.gallery[0] || selectedProperty.image}
                    alt={selectedProperty.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 px-4 py-2 rounded-sm bg-slate-950/90 text-amber-400 font-black text-lg backdrop-blur">
                    {selectedProperty.price}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {selectedProperty.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImg(img)}
                      className="aspect-video rounded-sm overflow-hidden border border-slate-200 cursor-pointer hover:opacity-80"
                    >
                      <img src={img} alt="Thumbnail" onError={handleImgError} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>`;

    const newInd = `<div className="space-y-3">
                {(() => {
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
                      <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-slate-900">
                        <img
                          src={currentImg}
                          alt={selectedProperty.title}
                          onError={handleImgError}
                          className="w-full h-full object-cover transition-all duration-300"
                        />
                        <div className="absolute bottom-4 left-4 px-4 py-2 rounded-sm bg-slate-950/90 text-amber-400 font-black text-lg backdrop-blur">
                          {selectedProperty.price}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2.5">
                        {galleryList.map((img: string, idx: number) => (
                          <div
                            key={idx}
                            onClick={() => setActiveImageIdx(idx)}
                            className={\`aspect-video rounded-sm overflow-hidden border-2 cursor-pointer transition \${
                              activeImageIdx === idx ? 'border-amber-500 ring-2 ring-amber-300 scale-95 shadow' : 'border-slate-200 opacity-70 hover:opacity-100'
                            }\`}
                          >
                            <img src={img} alt="Thumbnail" onError={handleImgError} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>`;
    if (indCode.includes(oldInd)) {
      indCode = indCode.replace(oldInd, newInd);
      fs.writeFileSync(indPath, indCode, 'utf-8');
      console.log('Patched IndustrialTemplate in', path.basename(dir));
    }
  }

  // 2. UrbanTemplate
  const urbPath = path.join(dir, 'UrbanTemplate.tsx');
  if (fs.existsSync(urbPath)) {
    let urbCode = fs.readFileSync(urbPath, 'utf-8');
    const oldUrb = `<div className="h-80 sm:h-96 rounded-lg overflow-hidden bg-slate-100">
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
                    className={\`h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition \${
                      activeGalleryIdx === i ? 'border-[#0084FF]' : 'border-transparent opacity-70 hover:opacity-100'
                    }\`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>`;

    const newUrb = `{(() => {
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
                          className={\`h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition \${
                            activeGalleryIdx === i ? 'border-[#0084FF] ring-2 ring-blue-300 scale-95 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }\`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}`;
    if (urbCode.includes(oldUrb)) {
      urbCode = urbCode.replace(oldUrb, newUrb);
      fs.writeFileSync(urbPath, urbCode, 'utf-8');
      console.log('Patched UrbanTemplate in', path.basename(dir));
    }
  }

  // 3. ResortTemplate
  const resPath = path.join(dir, 'ResortTemplate.tsx');
  if (fs.existsSync(resPath)) {
    let resCode = fs.readFileSync(resPath, 'utf-8');
    const oldRes = `<div className="h-80 sm:h-96 rounded-sm overflow-hidden bg-slate-900 border border-slate-700">
                <img
                  src={selectedUnit.gallery[activeGalleryIdx] || selectedUnit.image}
                  alt=""
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'; }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedUnit.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveGalleryIdx(i)}
                    className={\`h-20 rounded-sm overflow-hidden cursor-pointer border-2 transition \${
                      activeGalleryIdx === i ? 'border-[#E6CA65]' : 'border-transparent opacity-70 hover:opacity-100'
                    }\`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>`;

    const newRes = `{(() => {
                const galleryList = (selectedUnit.gallery && selectedUnit.gallery.length >= 3)
                  ? selectedUnit.gallery
                  : [
                      selectedUnit.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
                      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
                      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
                    ];
                return (
                  <>
                    <div className="h-80 sm:h-96 rounded-sm overflow-hidden bg-slate-900 border border-slate-700">
                      <img
                        src={galleryList[activeGalleryIdx] || galleryList[0]}
                        alt=""
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'; }}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2.5">
                      {galleryList.map((img: string, i: number) => (
                        <div
                          key={i}
                          onClick={() => setActiveGalleryIdx(i)}
                          className={\`h-20 rounded-sm overflow-hidden cursor-pointer border-2 transition \${
                            activeGalleryIdx === i ? 'border-[#E6CA65] ring-2 ring-amber-300 scale-95 shadow-md' : 'border-slate-700 opacity-70 hover:opacity-100'
                          }\`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}`;
    if (resCode.includes(oldRes)) {
      resCode = resCode.replace(oldRes, newRes);
      fs.writeFileSync(resPath, resCode, 'utf-8');
      console.log('Patched ResortTemplate in', path.basename(dir));
    }
  }
});
console.log('Finished patching ind/urb/res templates!');
