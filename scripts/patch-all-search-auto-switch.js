const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../apps/marketplace/src/components/demo/templates');
const websiteDir = path.join(__dirname, '../apps/website/src/components/templates');

// 1. Patch BDS16
const t16Path = path.join(templatesDir, 'BDS16Template.tsx');
let t16 = fs.readFileSync(t16Path, 'utf-8');

t16 = t16.replace(
  `  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const count = filteredProperties.length;
    showToast(\`🔍 Tìm thấy \${count} bất động sản phù hợp tiêu chí!\`);
    const resultsElem = document.getElementById('danh-sach-san-pham');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };`,
  `  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'for-sale' && currentPage !== 'for-rent') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProperties.length;
    showToast(\`🔍 Tìm thấy \${count} bất động sản phù hợp tiêu chí!\`);
    setTimeout(() => {
      const resultsElem = document.getElementById('danh-sach-san-pham');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };`
);

fs.writeFileSync(t16Path, t16, 'utf-8');
fs.copyFileSync(t16Path, path.join(websiteDir, 'BDS16Template.tsx'));
console.log('Patched BDS16Template with Global Search View Auto-Switch!');

// 2. Patch BDS15
const t15Path = path.join(templatesDir, 'BDS15Template.tsx');
let t15 = fs.readFileSync(t15Path, 'utf-8');

t15 = t15.replace(
  `  const handleSearchSubmit = () => {
    const count = filteredProperties.length;
    showToast(\`🔍 Tìm thấy \${count} bất động sản phù hợp tiêu chí!\`);
    const resultsElem = document.getElementById('du-an');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };`,
  `  const handleSearchSubmit = () => {
    if (currentPage !== 'home' && currentPage !== 'for-sale' && currentPage !== 'projects' && currentPage !== 'for-rent') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProperties.length;
    showToast(\`🔍 Tìm thấy \${count} bất động sản phù hợp tiêu chí!\`);
    setTimeout(() => {
      const resultsElem = document.getElementById('du-an');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };`
);

fs.writeFileSync(t15Path, t15, 'utf-8');
fs.copyFileSync(t15Path, path.join(websiteDir, 'BDS15Template.tsx'));
console.log('Patched BDS15Template with Global Search View Auto-Switch!');

// 3. Patch BDS14
const t14Path = path.join(templatesDir, 'BDS14Template.tsx');
let t14 = fs.readFileSync(t14Path, 'utf-8');

t14 = t14.replace(
  `  const handleSearchSubmit = () => {
    const count = filteredProperties.length;
    showToast(\`🔍 Đã tìm thấy \${count} bất động sản phù hợp!\`);
    const resultsElem = document.getElementById('danh-sach-bds');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };`,
  `  const handleSearchSubmit = () => {
    if (currentPage !== 'home' && currentPage !== 'for-sale' && currentPage !== 'for-rent' && currentPage !== 'projects') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProperties.length;
    showToast(\`🔍 Đã tìm thấy \${count} bất động sản phù hợp!\`);
    setTimeout(() => {
      const resultsElem = document.getElementById('danh-sach-bds');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };`
);

fs.writeFileSync(t14Path, t14, 'utf-8');
fs.copyFileSync(t14Path, path.join(websiteDir, 'BDS14Template.tsx'));
console.log('Patched BDS14Template with Global Search View Auto-Switch!');

// 4. Patch BDS13
const t13Path = path.join(templatesDir, 'BDS13Template.tsx');
let t13 = fs.readFileSync(t13Path, 'utf-8');
t13 = t13.replace(
  `  const handleSearchSubmit = () => {
    const count = filteredProperties.length;
    showToast(\`🔍 Đã tìm thấy \${count} bất động sản phù hợp!\`);
    const resultsElem = document.getElementById('danh-sach-bds');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };`,
  `  const handleSearchSubmit = () => {
    if (currentPage !== 'home' && currentPage !== 'for-sale' && currentPage !== 'for-rent' && currentPage !== 'projects') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProperties.length;
    showToast(\`🔍 Đã tìm thấy \${count} bất động sản phù hợp!\`);
    setTimeout(() => {
      const resultsElem = document.getElementById('danh-sach-bds');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };`
);
fs.writeFileSync(t13Path, t13, 'utf-8');
fs.copyFileSync(t13Path, path.join(websiteDir, 'BDS13Template.tsx'));

console.log('All search view auto-switch synchronizations finished successfully!');
