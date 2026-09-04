/**
 * Automated Screenshot & Mockup Generator for all 24 BDS Templates + 7 Landing Pages
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const ALL_SLUGS = [
  ...Array.from({ length: 24 }, (_, i) => `bds-${String(i + 1).padStart(2, '0')}`),
  ...Array.from({ length: 7 }, (_, i) => `lp-${String(i + 1).padStart(2, '0')}`)
];

const VIEWPORTS = [
  { type: 'desktop', width: 1440, height: 900, dpr: 1 },
  { type: 'tablet', width: 768, height: 1024, dpr: 1 },
  { type: 'mobile', width: 390, height: 844, dpr: 2 },
];

const RAW_DIR = path.join(__dirname, '..', 'apps', 'marketplace', 'public', 'images', 'mockups', 'raw');

async function captureTemplate(browser, slug) {
  const targetDir = path.join(RAW_DIR, slug);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Check if all 3 already exist
  const desktopExists = fs.existsSync(path.join(targetDir, 'desktop.png'));
  const tabletExists = fs.existsSync(path.join(targetDir, 'tablet.png'));
  const mobileExists = fs.existsSync(path.join(targetDir, 'mobile.png'));
  if (desktopExists && tabletExists && mobileExists) {
    console.log(`[SKIP] ${slug}: Đã có đủ 3 ảnh.`);
    return;
  }

  const page = await browser.newPage();
  // Block analytics / heavy non-essential third-party scripts to speed up
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('google-analytics') || url.includes('googletagmanager') || url.includes('clarity.ms')) {
      req.abort();
    } else {
      req.continue();
    }
  });

  console.log(`[START] Đang chụp: ${slug}...`);

  for (const cfg of VIEWPORTS) {
    const outPath = path.join(targetDir, `${cfg.type}.png`);
    if (fs.existsSync(outPath)) continue;

    try {
      await page.setViewport({
        width: cfg.width,
        height: cfg.height,
        deviceScaleFactor: cfg.dpr
      });

      const url = `https://templates.aireviewbds.com/demo/${slug}?embed=true&vp=${cfg.type}`;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 35000 });
      await new Promise(r => setTimeout(r, 1200));

      await page.screenshot({
        path: outPath,
        clip: { x: 0, y: 0, width: cfg.width, height: cfg.height }
      });
      console.log(`  -> ${slug} [${cfg.type}] OK`);
    } catch (err) {
      console.warn(`  [WARN] ${slug} [${cfg.type}] lỗi:`, err.message);
    }
  }

  await page.close();
}

async function run() {
  console.log('Khởi động trình duyệt tự động chụp...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  // Run in chunks of 2 concurrent workers
  const chunkSize = 2;
  for (let i = 0; i < ALL_SLUGS.length; i += chunkSize) {
    const chunk = ALL_SLUGS.slice(i, i + chunkSize);
    await Promise.all(chunk.map(slug => captureTemplate(browser, slug)));
    console.log(`Tiến độ: ${Math.min(i + chunkSize, ALL_SLUGS.length)}/${ALL_SLUGS.length} templates.`);
  }

  await browser.close();
  console.log('\nChụp ảnh hoàn tất! Bắt đầu tạo mockups 3D...');

  try {
    execSync('python scripts/generate_device_mockups.py', { stdio: 'inherit' });
  } catch (err) {
    console.error('Lỗi khi chạy script ghép mockup:', err.message);
  }
}

run().catch(console.error);
