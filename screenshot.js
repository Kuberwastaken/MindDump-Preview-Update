const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set the viewport to a landscape orientation
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate to your blog, waiting until the network is idle
  await page.goto('https://kuberwastaken.github.io/blog/', { waitUntil: 'networkidle2' });
  
  // Wait 5 seconds for dynamic content to load
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Capture the full-page screenshot
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
})();
