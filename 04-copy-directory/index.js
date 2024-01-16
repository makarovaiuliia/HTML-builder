const fs = require('fs');
const path = require('path');

function copyDir() {
  const srcDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);

  files.forEach((file) => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
  });

  console.log('Directory copied.');
}

copyDir();
