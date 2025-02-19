const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set the viewport to a landscape orientation (wider than tall)
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate to your blog with waitUntil option to wait for network to be idle
  await page.goto('https://kuberwastaken.github.io/blog/', { waitUntil: 'networkidle2' });
  
  // Optional: wait additional time (e.g., 5 seconds) for dynamic content to load
  await page.waitForTimeout(5000);

  // Capture the full-page screenshot in landscape mode
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
})();
