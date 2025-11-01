const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), '.next', 'server', 'app', 'admin', '(dashboard)');
const manifestPath = path.join(targetDir, 'page_client-reference-manifest.js');

if (!fs.existsSync(targetDir)) {
  // Nothing to do if the dashboard outputs were not generated.
  process.exit(0);
}

if (!fs.existsSync(manifestPath)) {
  const content =
    'globalThis.__RSC_MANIFEST=(globalThis.__RSC_MANIFEST||{});' +
    'globalThis.__RSC_MANIFEST["/admin/(dashboard)/page"]=' +
    '{"moduleLoading":{"prefix":"/_next/","crossOrigin":null},"ssrModuleMapping":{},"edgeSSRModuleMapping":{},"clientModules":{},"entryCSSFiles":{}};';
  fs.writeFileSync(manifestPath, content, 'utf8');
  console.log('Created missing admin dashboard manifest.');
}
