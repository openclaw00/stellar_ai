const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
fs.mkdirSync(dist, { recursive: true });

fs.copyFileSync(
  path.join(__dirname, '..', 'manifest.json'),
  path.join(dist, 'manifest.json')
);

fs.copyFileSync(
  path.join(__dirname, '..', 'src', 'background', 'index.js'),
  path.join(dist, 'background.js')
);

console.log('✓ Copied manifest.json and background.js to dist/');
