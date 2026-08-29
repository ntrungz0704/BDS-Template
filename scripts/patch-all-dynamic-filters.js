const fs = require('fs');
const path = require('path');

const t14Path = path.join(__dirname, '../apps/marketplace/src/components/demo/templates/BDS14Template.tsx');
let t14 = fs.readFileSync(t14Path, 'utf-8');

// 1. Add dynamic options memo to BDS14
t14 = t14.replace(
  `  // Search Filter States`,
  `  // Dynamic Options for 100% CMS Resilience
  const availableTypes = useMemo(() => {
    const set = new Set(BDS14_PROPERTIES.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableCities = useMemo(() => {
    const set = new Set(BDS14_PROPERTIES.map(p => p.city).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // Search Filter States`
);

// 2. Resilient filter in BDS14
t14 = t14.replace(
  `      if (filterType !== 'all' && p.type !== filterType) return false;
      if (filterCity !== 'all' && p.city !== filterCity) return false;`,
  `      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        if (t !== f && !t.includes(f) && !f.includes(t)) return false;
      }
      if (filterCity !== 'all') {
        const c = filterCity.toLowerCase();
        const loc = ((p.city || '') + ' ' + (p.location || '')).toLowerCase();
        if (!loc.includes(c) && !c.includes((p.city || '').toLowerCase())) return false;
      }`
);

// 3. Dynamic select options in BDS14 render
t14 = t14.replace(
  `<option value="all">Loại Bất Động Sản (Tất cả)</option>
              <option value="Nhà Phố Mặt Tiền">Nhà Phố Mặt Tiền</option>
              <option value="Căn Hộ Cao Cấp">Căn Hộ Cao Cấp</option>
              <option value="Biệt Thự Nhà Vườn">Biệt Thự Nhà Vườn</option>
              <option value="Penthouse Duplex">Penthouse Duplex</option>
              <option value="Căn Hộ Cho Thuê">Căn Hộ Cho Thuê</option>`,
  `<option value="all">Loại Bất Động Sản (Tất cả)</option>
              {availableTypes.filter(t => t !== 'all').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}`
);

t14 = t14.replace(
  `<option value="all">Tỉnh / Thành Phố (Tất cả)</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Nha Trang">Nha Trang</option>
              <option value="Huế">Huế</option>`,
  `<option value="all">Tỉnh / Thành Phố (Tất cả)</option>
              {availableCities.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}`
);

fs.writeFileSync(t14Path, t14, 'utf-8');
console.log('Patched BDS14Template.tsx with dynamic filters!');

// Sync to website
const t14Dest = path.join(__dirname, '../apps/website/src/components/templates/BDS14Template.tsx');
fs.copyFileSync(t14Path, t14Dest);

// Now patch BDS13
const t13Path = path.join(__dirname, '../apps/marketplace/src/components/demo/templates/BDS13Template.tsx');
let t13 = fs.readFileSync(t13Path, 'utf-8');

t13 = t13.replace(
  `  // UI Interactive States`,
  `  // Dynamic Options for 100% CMS Resilience
  const availableTypes = useMemo(() => {
    const set = new Set(BDS13_PROPERTIES.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableDistricts = useMemo(() => {
    const set = new Set(BDS13_PROPERTIES.map(p => p.district).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // UI Interactive States`
);

t13 = t13.replace(
  `      if (filterType !== 'all' && p.type !== filterType) return false;
      if (filterDistrict !== 'all' && p.district !== filterDistrict) return false;`,
  `      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        if (t !== f && !t.includes(f) && !f.includes(t)) return false;
      }
      if (filterDistrict !== 'all') {
        const d = filterDistrict.toLowerCase();
        const loc = ((p.district || '') + ' ' + (p.location || '')).toLowerCase();
        if (!loc.includes(d) && !d.includes((p.district || '').toLowerCase())) return false;
      }`
);

fs.writeFileSync(t13Path, t13, 'utf-8');
console.log('Patched BDS13Template.tsx with dynamic filters!');
const t13Dest = path.join(__dirname, '../apps/website/src/components/templates/BDS13Template.tsx');
fs.copyFileSync(t13Path, t13Dest);

// Now check BDS12
const t12Path = path.join(__dirname, '../apps/marketplace/src/components/demo/templates/BDS12Template.tsx');
let t12 = fs.readFileSync(t12Path, 'utf-8');
const t12Dest = path.join(__dirname, '../apps/website/src/components/templates/BDS12Template.tsx');
fs.copyFileSync(t12Path, t12Dest);

// Now check BDS11
const t11Path = path.join(__dirname, '../apps/marketplace/src/components/demo/templates/BDS11Template.tsx');
let t11 = fs.readFileSync(t11Path, 'utf-8');
const t11Dest = path.join(__dirname, '../apps/website/src/components/templates/BDS11Template.tsx');
fs.copyFileSync(t11Path, t11Dest);

// Now check BDS10
const t10Path = path.join(__dirname, '../apps/marketplace/src/components/demo/templates/BDS10Template.tsx');
let t10 = fs.readFileSync(t10Path, 'utf-8');
const t10Dest = path.join(__dirname, '../apps/website/src/components/templates/BDS10Template.tsx');
fs.copyFileSync(t10Path, t10Dest);

// Now check BDS09
const t09Path = path.join(__dirname, '../apps/marketplace/src/components/demo/templates/BDS09Template.tsx');
let t09 = fs.readFileSync(t09Path, 'utf-8');
const t09Dest = path.join(__dirname, '../apps/website/src/components/templates/BDS09Template.tsx');
fs.copyFileSync(t09Path, t09Dest);

// Now check BDS08
const t08Path = path.join(__dirname, '../apps/marketplace/src/components/demo/templates/BDS08Template.tsx');
let t08 = fs.readFileSync(t08Path, 'utf-8');
const t08Dest = path.join(__dirname, '../apps/website/src/components/templates/BDS08Template.tsx');
fs.copyFileSync(t08Path, t08Dest);

console.log('All dynamic filter synchronizations complete!');
