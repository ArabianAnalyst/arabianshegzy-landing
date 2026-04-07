import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BANNER = path.resolve(__dirname, '../public/banners/banner-03-editorial.html');
const OUTPUT = path.resolve(__dirname, '../public/banners/twitter-banner-1500x500.png');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 500, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(BANNER).href, { waitUntil: 'networkidle0' });

// Wait for fonts to load
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));

await page.screenshot({
  path: OUTPUT,
  clip: { x: 0, y: 0, width: 1500, height: 500 },
});

await browser.close();
console.log('✅ Banner saved to:', OUTPUT);
