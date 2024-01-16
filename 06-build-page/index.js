const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const templatePath = path.join(__dirname, 'template.html');
let template = fs.readFileSync(templatePath, 'utf-8');
const componentsPath = path.join(__dirname, 'components');
const componentFiles = fs.readdirSync(componentsPath);

componentFiles.forEach((file) => {
  if (path.extname(file) === '.html') {
    const componentName = path.basename(file, '.html');
    const componentContent = fs.readFileSync(
      path.join(componentsPath, file),
      'utf-8',
    );
    template = template.replace(
      new RegExp(`{{${componentName}}}`, 'g'),
      componentContent,
    );
  }
});

fs.writeFileSync(path.join(distPath, 'index.html'), template);

const stylesPath = path.join(__dirname, 'styles');
const cssFiles = fs.readdirSync(stylesPath);
let stylesContent = '';

cssFiles.forEach((file) => {
  if (path.extname(file) === '.css') {
    const cssContent = fs.readFileSync(path.join(stylesPath, file), 'utf-8');
    stylesContent += cssContent + '\n';
  }
});

fs.writeFileSync(path.join(distPath, 'style.css'), stylesContent);

const assetsSrc = path.join(__dirname, 'assets');
const assetsDest = path.join(distPath, 'assets');

function copyDirectory(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const items = fs.readdirSync(src, { withFileTypes: true });

  items.forEach((item) => {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);

    if (item.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

if (fs.existsSync(assetsSrc)) {
  copyDirectory(assetsSrc, assetsDest);
}
