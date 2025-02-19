const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Emulate dark mode so that websites using prefers-color-scheme render in dark mode
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

  // Set the viewport to a landscape orientation
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate to your blog and wait until network activity is idle
  await page.goto('https://kuberwastaken.github.io/blog/', { waitUntil: 'networkidle2' });
  
  // Wait for all fonts to load (this should help render the custom logo)
  await page.evaluateHandle('document.fonts.ready');

  // Optionally, wait an additional 5 seconds for any dynamic content to load
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Capture the full-page screenshot
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
})();
