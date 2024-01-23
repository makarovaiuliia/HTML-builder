const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const srcDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  try {
    if (
      !(await fs
        .access(destDir)
        .then(() => true)
        .catch(() => false))
    ) {
      await fs.mkdir(destDir, { recursive: true });
    }

    const files = await fs.readdir(srcDir);

    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      await fs.copyFile(srcFile, destFile);
    }

    console.log('Directory copied.');
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

copyDir();
