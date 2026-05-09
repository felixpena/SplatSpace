const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const screenshotsDir = path.join(__dirname, 'screenshots');

  // Desktop screenshot
  console.log('Taking desktop screenshot...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({
    path: path.join(screenshotsDir, 'full-desktop.png'),
    fullPage: true,
  });
  console.log('Desktop screenshot saved.');
  await desktopContext.close();

  // Mobile screenshot
  console.log('Taking mobile screenshot...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({
    path: path.join(screenshotsDir, 'full-mobile.png'),
    fullPage: true,
  });
  console.log('Mobile screenshot saved.');
  await mobileContext.close();

  await browser.close();
  console.log('Done.');
})();
