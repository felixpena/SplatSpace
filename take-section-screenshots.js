const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

/** Freeze all CSS animations/transitions so Playwright can screenshot without timing out */
async function freezeAnimations(page) {
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }`,
  });
}

/** Clip a screenshot of a section found by id */
async function screenshotById(page, id, outputPath) {
  const rect = await page.evaluate((elId) => {
    const el = document.getElementById(elId);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height };
  }, id);
  if (!rect) throw new Error(`#${id} not found`);
  console.log(`  #${id} bbox: x=${Math.round(rect.x)} y=${Math.round(rect.y)} w=${Math.round(rect.width)} h=${Math.round(rect.height)}`);
  await page.screenshot({
    path:     outputPath,
    clip:     { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
    fullPage: true,
    timeout:  60000,
  });
}

/** Clip a screenshot of a <section> matched by text content */
async function screenshotSectionByText(page, searchText, outputPath) {
  const rect = await page.evaluate((text) => {
    const sections = Array.from(document.querySelectorAll('section'));
    const el = sections.find(s => s.textContent && s.textContent.includes(text));
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height };
  }, searchText);
  if (!rect) throw new Error(`Section with text "${searchText}" not found`);
  console.log(`  section bbox: x=${Math.round(rect.x)} y=${Math.round(rect.y)} w=${Math.round(rect.width)} h=${Math.round(rect.height)}`);
  await page.screenshot({
    path:     outputPath,
    clip:     { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
    fullPage: true,
    timeout:  60000,
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ── DESKTOP context (1280×900) ─────────────────────────────────────────────
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await desktopCtx.newPage();

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  console.log('Page loaded.\n');

  // ── 1. Problem section ─────────────────────────────────────────────────────
  console.log('[1/4] Problem section...');
  await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const target   = sections.find(s => s.textContent && s.textContent.includes('Las visitas f'));
    target?.scrollIntoView();
  });
  await page.waitForTimeout(2500);
  await freezeAnimations(page); // freeze after animations have had time to fire
  await screenshotSectionByText(page, 'Las visitas f', path.join(screenshotsDir, 'section-problem.png'));
  console.log('  Saved section-problem.png');

  // ── 2. #demo section (desktop) ────────────────────────────────────────────
  console.log('\n[2/4] #demo section (desktop)...');
  await page.evaluate(() => document.getElementById('demo')?.scrollIntoView());
  await page.waitForTimeout(2500 + 4000); // animations + iframe load

  const iframeState = await page.evaluate(() => {
    const iframe = document.querySelector('#demo iframe');
    if (!iframe) return 'NO_IFRAME_FOUND';
    const rect = iframe.getBoundingClientRect();
    const skeleton = document.querySelector('#demo .animate-pulse');
    return {
      src:            iframe.getAttribute('src'),
      w:              Math.round(rect.width),
      h:              Math.round(rect.height),
      skeletonVisible: skeleton ? getComputedStyle(skeleton).display !== 'none' : false,
      readyState:     (() => { try { return iframe.contentDocument?.readyState || 'cross-origin'; } catch { return 'cross-origin'; } })(),
    };
  });
  console.log('  iframe state:', JSON.stringify(iframeState));

  // Freeze all animations before shooting (kills the animate-spin timeout issue)
  await freezeAnimations(page);
  await screenshotById(page, 'demo', path.join(screenshotsDir, 'section-splatviewer-desktop.png'));
  console.log('  Saved section-splatviewer-desktop.png');

  // ── 3. #formulario section ────────────────────────────────────────────────
  console.log('\n[3/4] #formulario section...');
  await page.evaluate(() => document.getElementById('formulario')?.scrollIntoView());
  await page.waitForTimeout(2500);
  await screenshotById(page, 'formulario', path.join(screenshotsDir, 'section-leadform.png'));
  console.log('  Saved section-leadform.png');

  await desktopCtx.close();

  // ── 4. #demo mobile (390×844) ─────────────────────────────────────────────
  console.log('\n[4/4] #demo section (mobile 390×844)...');
  const mobileCtx  = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.evaluate(() => document.getElementById('demo')?.scrollIntoView());
  await mobilePage.waitForTimeout(2500 + 4000);

  const mobileIframeState = await mobilePage.evaluate(() => {
    const iframe = document.querySelector('#demo iframe');
    if (!iframe) return 'NO_IFRAME_FOUND';
    const skeleton = document.querySelector('#demo .animate-pulse');
    return {
      src:            iframe.getAttribute('src'),
      skeletonVisible: skeleton ? getComputedStyle(skeleton).display !== 'none' : false,
      readyState:     (() => { try { return iframe.contentDocument?.readyState || 'cross-origin'; } catch { return 'cross-origin'; } })(),
    };
  });
  console.log('  mobile iframe state:', JSON.stringify(mobileIframeState));

  await freezeAnimations(mobilePage);
  await screenshotById(mobilePage, 'demo', path.join(screenshotsDir, 'section-splatviewer-mobile.png'));
  console.log('  Saved section-splatviewer-mobile.png');

  await mobileCtx.close();
  await browser.close();

  console.log('\n=== All done ===');
  const files = fs.readdirSync(screenshotsDir);
  console.log('Files in screenshots/:\n' + files.map(f => {
    const stat = fs.statSync(path.join(screenshotsDir, f));
    return `  ${f}  (${(stat.size / 1024).toFixed(1)} KB)`;
  }).join('\n'));
})().catch(err => {
  console.error('\nFATAL ERROR:', err);
  process.exit(1);
});
