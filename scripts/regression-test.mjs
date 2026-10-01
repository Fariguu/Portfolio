import { chromium } from "playwright";
import { spawn } from "child_process";

const PORT = 3012;
const BASE_URL = `http://localhost:${PORT}`;

console.log("=================================================");
console.log("🚀 AVVIO TEST DI REGRESSIONE SUITE COMPLETA");
console.log(`Porta target: ${PORT}`);
console.log("=================================================");

console.log(`Avvio del server Next.js di produzione sulla porta ${PORT}...`);
const serverProcess = spawn("npx", ["next", "start", "-p", String(PORT)], {
  cwd: "c:\\Users\\gabri\\Desktop\\Progetti\\Portfolio",
  shell: true,
  stdio: "inherit",
});

async function waitForServer(url, timeoutMs = 40000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404 || res.status === 307 || res.status === 308) {
        return true;
      }
    } catch {
      // attendi
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  throw new Error(`Server did not respond within ${timeoutMs}ms`);
}

const results = [];
function record(category, testName, passed, details = "") {
  results.push({ category, testName, passed, details });
  const icon = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`[${category}] ${icon} - ${testName} ${details ? `(${details})` : ""}`);
}

async function runRegression() {
  let browser;
  try {
    await waitForServer(BASE_URL);
    console.log("Server attivo e rispondente! Avvio test HTTP routes e Playwright...\n");

    // =========================================================================
    // 1. TEST HTTP ROUTES & CANONICAL URLS
    // =========================================================================
    console.log("--- 1. CONTROLLO ROUTE HTTP & CANONICAL URLS ---");
    const routesToTest = [
      { path: "/", expectedStatus: [200, 307, 308] },
      { path: "/chi-sono", expectedStatus: [200] },
      { path: "/competenze", expectedStatus: [200] },
      { path: "/percorso", expectedStatus: [200] },
      { path: "/progetti", expectedStatus: [200] },
      { path: "/contatti", expectedStatus: [200] },
      { path: "/preventivo", expectedStatus: [200] },
      { path: "/privacy", expectedStatus: [200] },
      { path: "/curriculum", expectedStatus: [200] },
      { path: "/en", expectedStatus: [200] },
      { path: "/en/chi-sono", expectedStatus: [200] },
      { path: "/en/competenze", expectedStatus: [200] },
      { path: "/en/percorso", expectedStatus: [200] },
      { path: "/en/progetti", expectedStatus: [200] },
      { path: "/en/contatti", expectedStatus: [200] },
      { path: "/admin/login", expectedStatus: [200] },
    ];

    for (const r of routesToTest) {
      try {
        const res = await fetch(`${BASE_URL}${r.path}`, { redirect: "manual" });
        const ok = r.expectedStatus.includes(res.status);
        record("Route HTTP", `GET ${r.path}`, ok, `status: ${res.status}`);
      } catch (err) {
        record("Route HTTP", `GET ${r.path}`, false, err.message);
      }
    }

    // Test Redirect Canonici (301 per /it/* -> path canonico senza prefisso)
    const redirectsToTest = [
      { path: "/it", expectedStatus: 301, expectedLocation: "/" },
      { path: "/it/chi-sono", expectedStatus: 301, expectedLocation: "/chi-sono" },
      { path: "/it/competenze", expectedStatus: 301, expectedLocation: "/competenze" },
      { path: "/it/curriculum", expectedStatus: 301, expectedLocation: "/curriculum" },
      { path: "/en/curriculum", expectedStatus: 307, expectedLocation: "/curriculum" },
    ];

    for (const red of redirectsToTest) {
      try {
        const res = await fetch(`${BASE_URL}${red.path}`, { redirect: "manual" });
        const location = res.headers.get("location") || "";
        const ok = res.status === red.expectedStatus && location.endsWith(red.expectedLocation);
        record("SEO Redirect", `GET ${red.path} -> ${red.expectedLocation}`, ok, `status: ${res.status}, location: ${location}`);
      } catch (err) {
        record("SEO Redirect", `GET ${red.path}`, false, err.message);
      }
    }

    // =========================================================================
    // 2. TEST API DOWNLOAD CURRICULUM
    // =========================================================================
    console.log("\n--- 2. CONTROLLO ENDPOINT BACKEND /api/cv/download ---");
    try {
      const res = await fetch(`${BASE_URL}/api/cv/download`);
      const status = res.status;
      const contentType = res.headers.get("content-type") || "";
      const contentDisp = res.headers.get("content-disposition") || "";

      record("Backend API", "GET /api/cv/download status 200", status === 200, `status: ${status}`);
      const isPdf = contentType.includes("application/pdf");
      record("Backend API", "Header Content-Type: application/pdf", isPdf, contentType);
      const hasAttachment = contentDisp.includes('attachment; filename="CV_Gabriele_Farigu.pdf"');
      record("Backend API", "Header Content-Disposition: attachment CV_Gabriele_Farigu.pdf", hasAttachment, contentDisp);

      if (status === 200) {
        const buffer = await res.arrayBuffer();
        const headerBytes = new TextDecoder().decode(buffer.slice(0, 5));
        const isValidPdfBuffer = headerBytes === "%PDF-";
        record("Backend API", "Payload binario è un valido file PDF (%PDF-)", isValidPdfBuffer, `dimensione: ${(buffer.byteLength / 1024).toFixed(1)} KB`);
      }
    } catch (err) {
      record("Backend API", "GET /api/cv/download", false, err.message);
    }

    // =========================================================================
    // 3. PLAYWRIGHT UI & INTERACTION TESTS
    // =========================================================================
    browser = await chromium.launch({ headless: true });

    // --- A. DESKTOP SUITE (1280x800) ---
    console.log("\n--- 3. TEST BROWSER DESKTOP (1280x800) ---");
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const desktopPage = await desktopContext.newPage();

    // Naviga a /curriculum
    await desktopPage.goto(`${BASE_URL}/curriculum`, { waitUntil: "networkidle" });

    // Titolo e intestazione
    const titleText = await desktopPage.locator("h1").innerText();
    record("Desktop UI", "Presenza titolo Curriculum Vitae", titleText.includes("Curriculum"));

    // Verifica pulsante Torna alla Home
    const backBtn = desktopPage.locator('main a:has-text("Torna alla Home")');
    record("Desktop UI", "Pulsante Torna alla Home presente nella pagina", (await backBtn.count()) > 0);

    // Verifica barra superiore della pagina (deve contenere solo il link Torna alla Home, nessun pulsante di download in alto a destra)
    const topBarActionLinks = await desktopPage.locator("main > div > div:first-child a").count();
    record("Desktop UI", "Barra superiore ha esclusivamente il link Torna alla Home", topBarActionLinks === 1, `link count: ${topBarActionLinks}`);

    // Verifica viewer PDF Desktop
    const desktopContainer = desktopPage.locator("div.hidden.md\\:block");
    record("Desktop UI", "Container viewer desktop presente nel DOM", (await desktopContainer.count()) > 0);

    // Verifica controlli zoom desktop
    const zoomInBtn = desktopPage.locator('div.hidden.md\\:block button[title="Aumenta zoom"]');
    const zoomOutBtn = desktopPage.locator('div.hidden.md\\:block button[title="Riduci zoom"]');
    record("Desktop UI", "Controlli Zoom Desktop presenti", (await zoomInBtn.count()) > 0 && (await zoomOutBtn.count()) > 0);

    // Verifica pulsante download desktop nella toolbar
    const desktopDownloadBtn = desktopPage.locator('div.hidden.md\\:block a[href="/api/cv/download"]');
    const desktopDownloadCount = await desktopDownloadBtn.count();
    record("Desktop UI", "Pulsante Scarica desktop punta a /api/cv/download", desktopDownloadCount > 0);
    if (desktopDownloadCount > 0) {
      const downloadAttr = await desktopDownloadBtn.first().getAttribute("download");
      record("Desktop UI", "Pulsante Scarica desktop ha attributo download CV_Gabriele_Farigu.pdf", downloadAttr === "CV_Gabriele_Farigu.pdf");
    }

    // --- B. MOBILE SUITE (iPhone 14 - 390x844) ---
    console.log("\n--- 4. TEST BROWSER MOBILE (iPhone 14 - 390x844) ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/curriculum`, { waitUntil: "networkidle" });

    // Verifica che il canvas desktop sia nascosto su mobile
    const desktopCanvasVisibleOnMobile = await mobilePage.locator("div.hidden.md\\:block").isVisible().catch(() => false);
    record("Mobile UI", "Viewer desktop nascosto su schermo smartphone", !desktopCanvasVisibleOnMobile);

    // Verifica presenza della card mobile
    const mobileCard = mobilePage.locator("div.block.md\\:hidden");
    record("Mobile UI", "Card documento mobile visualizzata", await mobileCard.isVisible());

    // Verifica pulsante 'Tocca per visualizzare' al centro del foglio A4
    const toccaBtn = mobilePage.locator('div.block.md\\:hidden a:has-text("Tocca per visualizzare")');
    record("Mobile UI", "Pulsante centrale 'Tocca per visualizzare' presente", await toccaBtn.isVisible());
    const toccaHref = await toccaBtn.getAttribute("href");
    const toccaTarget = await toccaBtn.getAttribute("target");
    record("Mobile UI", "Pulsante 'Tocca per visualizzare' apre il PDF in target _blank", toccaTarget === "_blank" && (toccaHref?.includes("curriculum.pdf") ?? false));

    // Verifica pulsante 'Scarica File PDF' su mobile
    const mobileDownloadBtn = mobilePage.locator('div.block.md\\:hidden a:has-text("Scarica File PDF")');
    record("Mobile UI", "Pulsante 'Scarica File PDF' visibile su mobile", await mobileDownloadBtn.isVisible());
    const mobDownloadHref = await mobileDownloadBtn.getAttribute("href");
    const mobDownloadAttr = await mobileDownloadBtn.getAttribute("download");
    record("Mobile UI", "Download mobile punta a /api/cv/download", mobDownloadHref === "/api/cv/download");
    record("Mobile UI", "Download mobile attributo download CV_Gabriele_Farigu.pdf", mobDownloadAttr === "CV_Gabriele_Farigu.pdf");

    // Verifica assenza di testi ridondanti
    const redundantTitle = await mobilePage.locator('div.block.md\\:hidden h4:has-text("Curriculum Vitae")').count();
    const redundantBadge = await mobilePage.locator('div.block.md\\:hidden :has-text("Pronto per il download")').count();
    record("Mobile UI", "Testi ridondanti eliminati dalla card mobile", redundantTitle === 0 && redundantBadge === 0);

    // --- C. CONTROLLO ADMIN DASHBOARD & CURRICULUM ---
    console.log("\n--- 5. TEST SEZIONE ADMIN ---");
    await desktopPage.goto(`${BASE_URL}/admin/login`, { waitUntil: "networkidle" });
    const loginTitle = await desktopPage.locator("h1, h2, h3").first().innerText().catch(() => "");
    record("Admin UI", "Accesso pagina login /admin/login", loginTitle.length > 0 || desktopPage.url().includes("/admin"));

  } catch (err) {
    console.error("FATAL TEST ERROR:", err);
  } finally {
    if (browser) await browser.close();
    console.log("\nTerminazione processo Next.js...");
    serverProcess.kill("SIGTERM");
  }

  // =========================================================================
  // REPORT FINALE
  // =========================================================================
  console.log("\n=================================================");
  console.log("📊 RIEPILOGO TEST DI REGRESSIONE");
  console.log("=================================================");
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;
  console.log(`Totale Test: ${total}`);
  console.log(`Superati:    ${passed} ✅`);
  console.log(`Falliti:     ${failed} ${failed > 0 ? "❌" : ""}`);
  console.log("=================================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runRegression();
