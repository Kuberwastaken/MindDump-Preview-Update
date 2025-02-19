const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.setViewport({ 
      width: 1920, 
      height: 1080,
      deviceScaleFactor: 2
    });

    // Load the page with simple wait condition
    await page.goto('https://kuberwastaken.github.io/blog/', { 
      waitUntil: 'domcontentloaded'
    });

    // Add Lisu font support
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

    // Brief pause to ensure font and dark mode are applied
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.screenshot({ 
      path: 'screenshot.png', 
      fullPage: true
    });

  } catch (error) {
    console.error('An error occurred:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});