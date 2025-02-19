const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set the viewport to a landscape orientation
  await page.setViewport({ 
    width: 1920, 
    height: 1080,
    deviceScaleFactor: 2 // For better quality screenshots
  });

  // Navigate to your blog, waiting until the network is idle
  await page.goto('https://kuberwastaken.github.io/blog/', { 
    waitUntil: 'networkidle2'
  });

  // Inject a font that supports the special character
  await page.addStyleTag({
    content: `
      @font-face {
        font-family: 'NotoSansLisu';
        src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lisu&display=swap');
      }
      body {
        font-family: 'NotoSansLisu', system-ui, -apple-system, sans-serif;
      }
    `
  });

  // Force dark mode
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'dark' }
  ]);

  // Wait for fonts to load and any dynamic content
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Ensure the special character is rendered correctly
  await page.evaluate(() => {
    document.fonts.ready.then(() => {
      // Force a repaint to ensure the font is applied
      document.body.style.opacity = '0.99';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });
  });

  // Capture the full-page screenshot
  await page.screenshot({ 
    path: 'screenshot.png', 
    fullPage: true,
    quality: 80 // Decent quality for PNG
  });

  await browser.close();
})();