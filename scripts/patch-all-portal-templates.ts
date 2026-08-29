import fs from 'fs';
import path from 'path';

function findRepoRoot(): string {
  let curr = process.cwd();
  while (curr !== path.dirname(curr)) {
    if (fs.existsSync(path.join(curr, 'pnpm-workspace.yaml'))) {
      return curr;
    }
    curr = path.dirname(curr);
  }
  return process.cwd();
}

const ROOT_DIR = findRepoRoot();
const PORTAL_TEMPLATES_DIR = path.join(ROOT_DIR, 'apps/marketplace/src/components/demo/portal-templates');

async function patchPortalTemplates() {
  console.log('🚀 Đang kiểm tra và vá toàn bộ 24 Portal Templates để đảm bảo luôn có 3-6 items...');

  const files = fs.readdirSync(PORTAL_TEMPLATES_DIR).filter(f => f.startsWith('Portal') && f.endsWith('.tsx'));

  for (const file of files) {
    const filePath = path.join(PORTAL_TEMPLATES_DIR, file);
    let code = fs.readFileSync(filePath, 'utf-8');

    // 1. Ensure filteredProperties useMemo fallback
    const useMemoPattern = /const filteredProperties = useMemo\(\(\) => \{([\s\S]*?)\}, \[filterCategory, filterType, filterCity, searchKeyword, sortBy\]\);/;
    
    if (useMemoPattern.test(code)) {
      const enhancedUseMemo = `const filteredProperties = useMemo(() => {
    const list = PORTAL_PROPERTIES.filter(item => {
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (filterCity !== 'all' && item.city !== filterCity) return false;
      if (searchKeyword && searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        return item.title.toLowerCase().includes(q) || 
               item.address.toLowerCase().includes(q) || 
               item.district.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNum - b.priceNum;
      if (sortBy === 'price-desc') return b.priceNum - a.priceNum;
      return b.id - a.id;
    });

    if (list.length > 0) return list;
    if (filterCategory !== 'all') {
      const catList = PORTAL_PROPERTIES.filter(p => p.category === filterCategory);
      if (catList.length > 0) return catList;
    }
    return PORTAL_PROPERTIES.slice(0, 6);
  }, [filterCategory, filterType, filterCity, searchKeyword, sortBy]);`;

      code = code.replace(useMemoPattern, enhancedUseMemo);
    }

    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Đã tối ưu hiển thị danh mục cho: ${file}`);
  }

  console.log('🎉 Hoàn tất vá 24 Portal Templates!');
}

patchPortalTemplates().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
