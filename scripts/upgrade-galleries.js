const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(process.cwd(), 'apps/marketplace/src/components/demo/templates'),
  path.join(process.cwd(), 'apps/website/src/components/templates')
];

const patternsToReplace = [
  {
    target: '<img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-80 sm:h-96 object-cover rounded-sm shadow" />',
    itemVar: 'selectedProperty'
  },
  {
    target: '<img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-80 sm:h-96 object-cover rounded-md shadow-xl" />',
    itemVar: 'selectedProperty'
  },
  {
    target: '<img src={selectedProperty.image} alt="" className="w-full h-96 object-cover rounded-md shadow-xl" />',
    itemVar: 'selectedProperty'
  },
  {
    target: '<img src={selectedProperty.image} alt="" className="w-full h-96 object-cover shadow-lg border" />',
    itemVar: 'selectedProperty'
  },
  {
    target: '<img src={selectedProperty.image} alt="" className="w-full h-96 object-cover border" />',
    itemVar: 'selectedProperty'
  },
  {
    target: '<img src={selectedProject.image} alt="" className="w-full h-96 object-cover rounded-sm border border-white/10" />',
    itemVar: 'selectedProject'
  },
  {
    target: '<img src={selectedProject.image} alt="" className="w-full h-96 object-cover shadow-lg border" />',
    itemVar: 'selectedProject'
  },
  {
    target: '<img src={selectedUnit.image} alt={selectedUnit.name} className="w-full h-80 sm:h-96 object-cover rounded-md shadow-xl" />',
    itemVar: 'selectedUnit'
  },
  {
    target: '<img src={selectedUnit.image} alt="" className="w-full h-96 object-cover shadow-lg border" />',
    itemVar: 'selectedUnit'
  },
  {
    target: '<img src={currentTabUnit.image} alt={currentTabUnit.name} className="w-full h-80 object-cover" />',
    itemVar: 'currentTabUnit'
  }
];

function generateGalleryJSX(itemVar) {
  return `<div className="space-y-3">
                {(() => {
                  const targetItem = ${itemVar};
                  const rawGallery = targetItem?.gallery || targetItem?.images || [];
                  const galleryList = (Array.isArray(rawGallery) && rawGallery.length >= 3)
                    ? rawGallery
                    : [
                        targetItem?.image || targetItem?.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
                        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
                        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
                        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'
                      ];
                  const currentImg = galleryList[activeImageIdx] || galleryList[0];
                  return (
                    <>
                      <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg border relative bg-slate-100">
                        <img
                          src={currentImg}
                          alt=""
                          className="w-full h-full object-cover transition-all duration-300"
                        />
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
                })()}
              </div>`;
}

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let code = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    patternsToReplace.forEach(p => {
      if (code.includes(p.target)) {
        code = code.replace(p.target, generateGalleryJSX(p.itemVar));
        modified = true;
        console.log(`[Upgraded] ${file} in ${path.basename(dir)} for ${p.itemVar}`);
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, code, 'utf-8');
    }
  });
});

console.log('Finished updating templates with 4-thumbnail interactive galleries!');
