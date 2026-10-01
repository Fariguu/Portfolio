import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 3015;
const BASE_URL = `http://localhost:${PORT}`;
const TARGET_PATH = process.argv[2] || "/curriculum";
const AUDIT_URL = `${BASE_URL}${TARGET_PATH}`;

console.log("=================================================");
console.log("⚡ LIGHTHOUSE PERFORMANCE AUDIT SUITE");
console.log(`Target URL: ${AUDIT_URL}`);
console.log("=================================================\n");

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
      if (res.ok || res.status === 200) return true;
    } catch {
      // attendi
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  throw new Error(`Server did not respond within ${timeoutMs}ms`);
}

async function runAudit() {
  try {
    await waitForServer(AUDIT_URL);
    console.log("Server attivo! Inizio audit Lighthouse (Desktop & Mobile)...\n");

    const outDir = path.join(process.cwd(), ".lighthouseci");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // 1. AUDIT MOBILE (Throttled mobile 4G / CPU 4x slow)
    console.log("📱 Esecuzione Audit MOBILE...");
    const mobileReportPath = path.join(outDir, "mobile-report.json");
    await new Promise((resolve, reject) => {
      const lh = spawn(
        "npx",
        [
          "lighthouse",
          AUDIT_URL,
          "--output=json",
          `--output-path=${mobileReportPath}`,
          "--chrome-flags=--headless=new --no-sandbox",
          "--form-factor=mobile",
          "--throttling-method=simulate",
          "--quiet",
        ],
        { shell: true, stdio: "inherit" }
      );
      lh.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`Lighthouse mobile exit code ${code}`))));
    });

    // 2. AUDIT DESKTOP
    console.log("\n🖥️ Esecuzione Audit DESKTOP...");
    const desktopReportPath = path.join(outDir, "desktop-report.json");
    await new Promise((resolve, reject) => {
      const lh = spawn(
        "npx",
        [
          "lighthouse",
          AUDIT_URL,
          "--output=json",
          `--output-path=${desktopReportPath}`,
          "--chrome-flags=--headless=new --no-sandbox",
          "--preset=desktop",
          "--quiet",
        ],
        { shell: true, stdio: "inherit" }
      );
      lh.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`Lighthouse desktop exit code ${code}`))));
    });

    // Lettura e parsing risultati
    const mobileData = JSON.parse(fs.readFileSync(mobileReportPath, "utf-8"));
    const desktopData = JSON.parse(fs.readFileSync(desktopReportPath, "utf-8"));

    function printReport(title, data) {
      console.log(`\n=================================================`);
      console.log(`📊 RISULTATI LIGHTHOUSE: ${title}`);
      console.log(`=================================================`);
      const cats = data.categories;
      for (const [key, val] of Object.entries(cats)) {
        const score = Math.round(val.score * 100);
        let badge = "🟢";
        if (score < 50) badge = "🔴";
        else if (score < 90) badge = "🟡";
        console.log(`${badge} ${val.title.padEnd(20)}: ${score}/100`);
      }

      console.log(`\nMetriche Core Web Vitals:`);
      const audits = data.audits;
      const fcp = audits["first-contentful-paint"]?.displayValue || "N/A";
      const lcp = audits["largest-contentful-paint"]?.displayValue || "N/A";
      const tbt = audits["total-blocking-time"]?.displayValue || "N/A";
      const cls = audits["cumulative-layout-shift"]?.displayValue || "N/A";
      const si = audits["speed-index"]?.displayValue || "N/A";

      console.log(`- FCP (First Contentful Paint)   : ${fcp}`);
      console.log(`- LCP (Largest Contentful Paint) : ${lcp}`);
      console.log(`- TBT (Total Blocking Time)      : ${tbt}`);
      console.log(`- CLS (Cumulative Layout Shift)  : ${cls}`);
      console.log(`- Speed Index                    : ${si}`);
      console.log(`=================================================`);
    }

    printReport("MOBILE", mobileData);
    printReport("DESKTOP", desktopData);

  } catch (err) {
    console.error("ERRORE DURANTE L'AUDIT LIGHTHOUSE:", err);
  } finally {
    console.log("\nTerminazione processo Next.js...");
    serverProcess.kill("SIGTERM");
  }
}

runAudit();
