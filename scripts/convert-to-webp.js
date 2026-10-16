const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  path.join(__dirname, '..', 'public'),
  path.join(__dirname, '..', 'public', 'bodegas_photos'),
  path.join(__dirname, '..', 'public', 'img'),
  path.join(__dirname, '..', 'public', 'slides'),
];

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  const outputPath = path.join(dir, `${baseName}.webp`);

  const originalStats = fs.statSync(filePath);
  const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
  const originalSizeKB = (originalStats.size / 1024).toFixed(1);

  console.log(`Converting: ${path.relative(path.join(__dirname, '..'), filePath)} (${originalSizeKB} KB)...`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // If it's a massive raw camera photo (> 2560px), resize to max width 2560px while preserving aspect ratio
    let pipeline = sharp(filePath);
    if (metadata.width && metadata.width > 2560) {
      pipeline = pipeline.resize({ width: 2560, withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSizeKB = (newStats.size / 1024).toFixed(1);
    const savedPercent = (((originalStats.size - newStats.size) / originalStats.size) * 100).toFixed(1);

    console.log(`  -> Created: ${path.basename(outputPath)} (${newSizeKB} KB, ahorrado: ${savedPercent}%)`);
  } catch (err) {
    console.error(`  Error converting ${filePath}:`, err.message);
  }
}

async function run() {
  console.log('--- Iniciando conversion a WebP ---');
  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        await convertFile(fullPath);
      }
    }
  }
  console.log('--- Conversion completada con exito ---');
}

run();
