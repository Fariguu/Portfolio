import { chromium } from "playwright";
import { spawn } from "child_process";

const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}`;

console.log(`Starting Next.js server on port ${PORT}...`);
const serverProcess = spawn("npx", ["next", "start", "-p", String(PORT)], {
  cwd: "c:\\Users\\gabri\\Desktop\\Progetti\\Portfolio",
  shell: true,
  stdio: "inherit",
});

async function waitForServer(url, timeoutMs = 30000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // wait
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not respond within ${timeoutMs}ms`);
}

const results = [];
function recordResult(testName, passed, details = "") {
  results.push({ testName, passed, details });
  const status = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`${status} - ${testName} ${details ? `(${details})` : ""}`);
}

async function runTests() {
  let browser;
  try {
    await waitForServer(BASE_URL);
    console.log("Server is ready! Launching headless Chromium...");

    browser = await chromium.launch({ headless: true });

    // =========================================================================
    // SUITE 1: DESKTOP VIEWPORT (1280 x 800)
    // =========================================================================
    console.log("\n==========================================");
    console.log("🖥️  DESKTOP VIEWPORT TESTS (1280x800)");
    console.log("==========================================");

    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(BASE_URL, { waitUntil: "networkidle" });

    // Helper: Reset to top to guarantee header visibility
    async function resetDesktopToTop() {
      await desktopPage.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await desktopPage.waitForTimeout(350);
    }

    // Test 1: Desktop Quick Link: Competenze
    try {
      await resetDesktopToTop();
      const link = desktopPage.locator('header nav a[href="#competenze"]').first();
      await link.click();
      await desktopPage.waitForTimeout(600);
      const inView = await desktopPage.evaluate(() => {
        const el = document.getElementById("competenze");
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      recordResult("Desktop Quick Link: Competenze", inView, "Navigates to #competenze");
    } catch (e) {
      recordResult("Desktop Quick Link: Competenze", false, e.message);
    }

    // Test 2: Desktop Quick Link: Percorso
    try {
      await resetDesktopToTop();
      const link = desktopPage.locator('header nav a[href="#percorso"]').first();
      await link.click();
      await desktopPage.waitForTimeout(600);
      const inView = await desktopPage.evaluate(() => {
        const el = document.getElementById("percorso");
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      recordResult("Desktop Quick Link: Percorso", inView, "Navigates to #percorso");
    } catch (e) {
      recordResult("Desktop Quick Link: Percorso", false, e.message);
    }

    // Test 3: Desktop Quick Link: Progetti
    try {
      await resetDesktopToTop();
      const link = desktopPage.locator('header nav a[href="#progetti"]').first();
      await link.click();
      await desktopPage.waitForTimeout(600);
      const inView = await desktopPage.evaluate(() => {
        const el = document.getElementById("progetti");
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      recordResult("Desktop Quick Link: Progetti", inView, "Navigates to #progetti");
    } catch (e) {
      recordResult("Desktop Quick Link: Progetti", false, e.message);
    }

    // Test 4: Desktop Quick Link: Contatti
    try {
      await resetDesktopToTop();
      const link = desktopPage.locator('header nav a[href="#contatti"]').first();
      await link.click();
      await desktopPage.waitForTimeout(600);
      const inView = await desktopPage.evaluate(() => {
        const el = document.getElementById("contatti");
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      recordResult("Desktop Quick Link: Contatti", inView, "Navigates to #contatti");
    } catch (e) {
      recordResult("Desktop Quick Link: Contatti", false, e.message);
    }

    // Test 5: Hero CTA: Guarda i miei progetti
    try {
      await resetDesktopToTop();
      const heroCtaProjects = desktopPage.locator('#chi-sono a[href="#progetti"]').first();
      await heroCtaProjects.click();
      await desktopPage.waitForTimeout(600);
      const inView = await desktopPage.evaluate(() => {
        const el = document.getElementById("progetti");
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      recordResult("Hero CTA: Guarda i miei progetti", inView, "Navigates to #progetti");
    } catch (e) {
      recordResult("Hero CTA: Guarda i miei progetti", false, e.message);
    }

    // Test 6: Hero CTA: Contattami
    try {
      await resetDesktopToTop();
      const heroCtaContact = desktopPage.locator('#chi-sono a[href="#contatti"]').first();
      await heroCtaContact.click();
      await desktopPage.waitForTimeout(600);
      const inView = await desktopPage.evaluate(() => {
        const el = document.getElementById("contatti");
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      recordResult("Hero CTA: Contattami", inView, "Navigates to #contatti");
    } catch (e) {
      recordResult("Hero CTA: Contattami", false, e.message);
    }

    // Test 7: Language Switcher (IT -> EN & EN -> IT)
    try {
      await resetDesktopToTop();
      const langSwitcherBtn = desktopPage.locator('header button[title*="Inglese"], header button[title*="English"], header button[aria-label*="Inglese"]').first();
      if (await langSwitcherBtn.isVisible()) {
        await langSwitcherBtn.click();
        await desktopPage.waitForTimeout(1000);
        const enUrl = desktopPage.url();
        const switchedToEn = enUrl.includes("/en");
        recordResult("Language Switcher (IT -> EN)", switchedToEn, `URL switched to: ${enUrl}`);

        // Reset to top to guarantee header visibility for switching back
        await resetDesktopToTop();
        const itSwitcherBtn = desktopPage.locator('header button[title*="Italiano"], header button[title*="Italian"], header button[aria-label*="Italiano"]').first();
        if (await itSwitcherBtn.isVisible()) {
          await itSwitcherBtn.click();
          await desktopPage.waitForTimeout(1000);
          const itUrl = desktopPage.url();
          recordResult("Language Switcher (EN -> IT)", !itUrl.includes("/en"), `URL returned to: ${itUrl}`);
        }
      }
    } catch (e) {
      recordResult("Language Switcher", false, e.message);
    }

    // Test 8: Theme Switcher (Dark / Light)
    try {
      await resetDesktopToTop();
      const themeToggle = desktopPage.locator('header button[aria-label*="tema"], header button[aria-label*="theme"]').first();
      if (await themeToggle.isVisible()) {
        const initialDark = await desktopPage.evaluate(() => document.documentElement.classList.contains("dark"));
        await themeToggle.click();
        await desktopPage.waitForTimeout(400);
        const toggledDark = await desktopPage.evaluate(() => document.documentElement.classList.contains("dark"));
        recordResult("Theme Switcher (Dark/Light)", initialDark !== toggledDark, `Toggled from ${initialDark ? 'dark' : 'light'} to ${toggledDark ? 'dark' : 'light'}`);
      }
    } catch (e) {
      recordResult("Theme Switcher", false, e.message);
    }

    // Test 9: Hero Explore Link "Chi sono ↳"
    try {
      await desktopPage.goto(BASE_URL, { waitUntil: "networkidle" });
      await resetDesktopToTop();
      const aboutLink = desktopPage.locator('#chi-sono a[href$="chi-sono"]').first();
      if (await aboutLink.isVisible()) {
        await aboutLink.click();
        await desktopPage.waitForURL("**/chi-sono", { timeout: 6000 });
        const isAbout = desktopPage.url().includes("/chi-sono");
        
        // Find Back to Home button in chi-sono page
        const backBtn = desktopPage.locator('section[aria-label="Ritorno alla Home"] a, a[href="/"], a[href="/en"]').first();
        const hasBack = (await backBtn.count()) > 0;
        if (hasBack) {
          await backBtn.click();
          await desktopPage.waitForTimeout(600);
        }
        recordResult("Chi Sono Page Navigation & Back Button", isAbout && hasBack, "Opens dedicated /chi-sono page with back navigation");
      }
    } catch (e) {
      recordResult("Chi Sono Page Navigation", false, e.message);
    }

    // =========================================================================
    // SUITE 2: MOBILE VIEWPORT (390 x 844 - iPhone)
    // =========================================================================
    console.log("\n==========================================");
    console.log("📱  MOBILE VIEWPORT TESTS (390x844)");
    console.log("==========================================");

    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(BASE_URL, { waitUntil: "networkidle" });

    // Test 10: Floating Bottom Dock Presence
    try {
      const dock = mobilePage.locator('nav[aria-label="Navigazione rapida mobile"]').first();
      const isDockVisible = await dock.isVisible();
      recordResult("Mobile Floating Bottom Dock Presence", isDockVisible, "Dock is anchored in bottom thumb zone");
    } catch (e) {
      recordResult("Mobile Floating Bottom Dock Presence", false, e.message);
    }

    // Test 11: Mobile Dock: Competenze Button
    try {
      const btn = mobilePage.locator('nav[aria-label="Navigazione rapida mobile"] button:has-text("Competenze")').first();
      await btn.click();
      await mobilePage.waitForTimeout(600);
      const inView = await mobilePage.evaluate(() => {
        const el = document.getElementById("competenze");
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      recordResult("Mobile Bottom Dock: Competenze Button", inView, "Scrolls smoothly to #competenze");
    } catch (e) {
      recordResult("Mobile Bottom Dock: Competenze Button", false, e.message);
    }

    // Test 12: Mobile Dock: Percorso Button
    try {
      const btn = mobilePage.locator('nav[aria-label="Navigazione rapida mobile"] button:has-text("Percorso")').first();
      await btn.click();
      await mobilePage.waitForTimeout(600);
      const inView = await mobilePage.evaluate(() => {
        const el = document.getElementById("percorso");
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      recordResult("Mobile Bottom Dock: Percorso Button", inView, "Scrolls smoothly to #percorso");
    } catch (e) {
      recordResult("Mobile Bottom Dock: Percorso Button", false, e.message);
    }

    // Test 13: Mobile Dock: Progetti Button
    try {
      const btn = mobilePage.locator('nav[aria-label="Navigazione rapida mobile"] button:has-text("Progetti")').first();
      await btn.click();
      await mobilePage.waitForTimeout(600);
      const inView = await mobilePage.evaluate(() => {
        const el = document.getElementById("progetti");
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      recordResult("Mobile Bottom Dock: Progetti Button", inView, "Scrolls smoothly to #progetti");
    } catch (e) {
      recordResult("Mobile Bottom Dock: Progetti Button", false, e.message);
    }

    // Scroll back to top on mobile
    await mobilePage.evaluate(() => window.scrollTo(0, 0));
    await mobilePage.waitForTimeout(400);

    // Test 14: Mobile Hero CTA Buttons & Tech Chips Grid
    try {
      const ctaProjects = mobilePage.locator('#chi-sono a[href="#progetti"]').first();
      const isVisible = await ctaProjects.isVisible();
      const chipCount = await mobilePage.locator('#chi-sono .flex-wrap .inline-flex').count();
      recordResult("Mobile Hero CTA & Grid Chips", isVisible && chipCount >= 8, `Buttons visible & ${chipCount} tech chips in grid layout`);
    } catch (e) {
      recordResult("Mobile Hero CTA & Grid Chips", false, e.message);
    }

    // Test 15: Mobile Spacing Clearance (Chips vs Bottom Dock)
    try {
      const clearance = await mobilePage.evaluate(() => {
        const chipsContainer = document.querySelector("#chi-sono .flex-wrap");
        const dock = document.querySelector('nav[aria-label="Navigazione rapida mobile"]');
        if (!chipsContainer || !dock) return 0;
        const chipsRect = chipsContainer.getBoundingClientRect();
        const dockRect = dock.getBoundingClientRect();
        return dockRect.top - chipsRect.bottom;
      });
      const hasSafeGap = clearance >= 25;
      recordResult("Mobile Spacing Clearance (Chips to Dock)", hasSafeGap, `Gap between chips and dock is ${Math.round(clearance)}px (min 25px required)`);
    } catch (e) {
      recordResult("Mobile Spacing Clearance", false, e.message);
    }

    // Test 16: Mobile Hamburger Menu Drawer
    try {
      const menuBtn = mobilePage.locator('header button[aria-label*="menu"], header button[aria-label*="navigazione"]').first();
      if (await menuBtn.isVisible()) {
        await menuBtn.click();
        await mobilePage.waitForTimeout(500);
        
        const drawerLinks = mobilePage.locator('[role="dialog"] a, nav[data-mobile-menu] a, [data-state="open"] a');
        const count = await drawerLinks.count();
        recordResult("Mobile Hamburger Menu Drawer", count >= 3, `Drawer opens with ${count} navigation links`);
      }
    } catch (e) {
      recordResult("Mobile Hamburger Menu Drawer", false, e.message);
    }

    // Test 17: Section Explore Buttons (Competenze -> /competenze, Percorso -> /percorso, Progetti -> /progetti)
    try {
      await mobilePage.goto(BASE_URL, { waitUntil: "networkidle" });
      const skillsExplore = mobilePage.locator('a[href$="/competenze"]').first();
      const journeyExplore = mobilePage.locator('a[href$="/percorso"]').first();
      const projectsExplore = mobilePage.locator('a[href$="/progetti"]').first();

      const allExist = (await skillsExplore.count()) > 0 &&
                       (await journeyExplore.count()) > 0 &&
                       (await projectsExplore.count()) > 0;

      recordResult("Section Explore Buttons", allExist, "Explore links verified for Competenze, Percorso, and Progetti");
    } catch (e) {
      recordResult("Section Explore Buttons", false, e.message);
    }

    // Test 18: Project Card Interactive Buttons (Demo & GitHub Code)
    try {
      const codeBtns = await mobilePage.locator('#progetti a[href*="github.com"]').count();
      recordResult("Project Cards Interactive Buttons", codeBtns >= 1, `Found ${codeBtns} functional external code buttons on project cards`);
    } catch (e) {
      recordResult("Project Cards Interactive Buttons", false, e.message);
    }

    // =========================================================================
    // FINAL SUMMARY
    // =========================================================================
    console.log("\n==========================================");
    console.log("📊 TEST EXECUTION SUMMARY");
    console.log("==========================================");
    const passedTests = results.filter((r) => r.passed).length;
    const totalTests = results.length;
    console.log(`Total: ${totalTests} | Passed: ${passedTests} | Failed: ${totalTests - passedTests}`);

    if (passedTests === totalTests) {
      console.log("\n🎉 ALL BUTTON AND INTERACTION TESTS PASSED PERFECTLY!");
    } else {
      console.log(`\n⚠️ ${totalTests - passedTests} test(s) failed.`);
    }

  } finally {
    if (browser) await browser.close();
    serverProcess.kill("SIGTERM");
    process.exit(results.every((r) => r.passed) ? 0 : 1);
  }
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
  serverProcess.kill("SIGTERM");
  process.exit(1);
});
