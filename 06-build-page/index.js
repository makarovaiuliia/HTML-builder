const fs = require('fs').promises;
const path = require('path');

async function main() {
  const distPath = path.join(__dirname, 'project-dist');
  try {
    if (
      !(await fs
        .access(distPath)
        .then(() => true)
        .catch(() => false))
    ) {
      await fs.mkdir(distPath);
    }

    const templatePath = path.join(__dirname, 'template.html');
    let template = await fs.readFile(templatePath, 'utf-8');

    const componentsPath = path.join(__dirname, 'components');
    const componentFiles = await fs.readdir(componentsPath);

    for (const file of componentFiles) {
      if (path.extname(file) === '.html') {
        const componentName = path.basename(file, '.html');
        const componentContent = await fs.readFile(
          path.join(componentsPath, file),
          'utf-8',
        );
        template = template.replace(
          new RegExp(`{{${componentName}}}`, 'g'),
          componentContent,
        );
      }
    }

    await fs.writeFile(path.join(distPath, 'index.html'), template);

    const stylesPath = path.join(__dirname, 'styles');
    const cssFiles = await fs.readdir(stylesPath);
    let stylesContent = '';

    for (const file of cssFiles) {
      if (path.extname(file) === '.css') {
        const cssContent = await fs.readFile(
          path.join(stylesPath, file),
          'utf-8',
        );
        stylesContent += cssContent + '\n';
      }
    }

    await fs.writeFile(path.join(distPath, 'style.css'), stylesContent);

    const assetsSrc = path.join(__dirname, 'assets');
    const assetsDest = path.join(distPath, 'assets');

    if (
      await fs
        .access(assetsSrc)
        .then(() => true)
        .catch(() => false)
    ) {
      await copyDirectory(assetsSrc, assetsDest);
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const items = await fs.readdir(src, { withFileTypes: true });

  for (const item of items) {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);

    if (item.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

main();
