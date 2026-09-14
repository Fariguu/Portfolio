import fs from 'fs';
import path from 'path';

const staticChunksDir = path.join(process.cwd(), '.next', 'static', 'chunks');
const serverAppDir = path.join(process.cwd(), '.next', 'server', 'app');

if (fs.existsSync(staticChunksDir) && fs.existsSync(serverAppDir)) {
  const cssFiles = fs.readdirSync(staticChunksDir).filter((f) => f.endsWith('.css'));
  console.log('[inline-css] Found CSS chunks:', cssFiles);

  const cssMap = new Map();
  for (const f of cssFiles) {
    const cssPath = path.join(staticChunksDir, f);
    const text = fs.readFileSync(cssPath, 'utf8');
    cssMap.set(f, text);
  }

  let totalInlined = 0;

  function processDir(dir) {
    for (const item of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        processDir(fullPath);
      } else if (item.endsWith('.html')) {
        let html = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        for (const [filename, css] of cssMap.entries()) {
          const regex = new RegExp(
            '<link[^>]*href=["\'](?:/_next/)?static/chunks/' + filename + '["\'][^>]*>',
            'g'
          );

          if (regex.test(html)) {
            html = html.replace(
              regex,
              `<style data-inline-css="true">${css}</style><link rel="stylesheet" href="/_next/static/chunks/${filename}" data-precedence="next" media="print" onload="this.media='all'"/><noscript><link rel="stylesheet" href="/_next/static/chunks/${filename}" data-precedence="next"/></noscript>`
            );
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(fullPath, html, 'utf8');
          totalInlined++;
        }
      }
    }
  }

  processDir(serverAppDir);
  console.log(`[inline-css] Successfully inlined CSS across ${totalInlined} static HTML pages.`);
} else {
  console.warn('[inline-css] Directories not found, skipping.');
}
