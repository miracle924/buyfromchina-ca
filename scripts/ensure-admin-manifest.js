const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), '.next', 'server', 'app', 'admin', '(dashboard)');
const manifestPath = path.join(targetDir, 'page_client-reference-manifest.js');
const adminManifestPath = path.join(process.cwd(), '.next', 'server', 'app', 'admin', 'page_client-reference-manifest.js');

if (!fs.existsSync(targetDir)) {
  // Nothing to do if the dashboard outputs were not generated.
  process.exit(0);
}

if (!fs.existsSync(manifestPath)) {
  if (!fs.existsSync(adminManifestPath)) {
    console.warn('Admin manifest source missing; unable to patch dashboard manifest.');
    process.exit(0);
  }

  const source = fs.readFileSync(adminManifestPath, 'utf8');
  const patched = source.replace(/\/admin\/page/g, '/admin/(dashboard)/page');
  fs.writeFileSync(manifestPath, patched, 'utf8');
  console.log('Copied admin manifest for dashboard to satisfy RSC runtime.');
}
