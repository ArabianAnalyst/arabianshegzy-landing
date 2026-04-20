import { chromium } from 'playwright';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BANNERS = [
  {
    file: 'banner-linkedin-v2-center.html',
    output: 'banner-linkedin-FINAL-1584x396.png',
    width: 1584,
    height: 396,
  },
  {
    file: 'banner-twitter-v2-center.html',
    output: 'banner-twitter-FINAL-1500x500.png',
    width: 1500,
    height: 500,
  },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const banner of BANNERS) {
    const filePath = resolve(__dirname, banner.file);
    await page.setViewportSize({ width: banner.width, height: banner.height });
    await page.goto(`file://${filePath}`);
    await page.waitForTimeout(3000); // let fonts fully load

    const outputPath = resolve(__dirname, banner.output);
    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: banner.width, height: banner.height },
      animations: 'disabled',
    });
    console.log(`Exported: ${banner.output}`);
  }

  await browser.close();
  console.log('Done. PNG files are in the banners folder.');
})();
