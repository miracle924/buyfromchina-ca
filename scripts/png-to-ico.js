const fs = require('fs');

const [,, inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/png-to-ico.js <input.png> <output.ico>');
  process.exit(1);
}

const png = fs.readFileSync(inputPath);
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header[8] = 0;
header[9] = 0;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(6 + 16, 18);
const ico = Buffer.concat([header, png]);
fs.writeFileSync(outputPath, ico);
console.log(`Wrote ICO ${outputPath}`);
