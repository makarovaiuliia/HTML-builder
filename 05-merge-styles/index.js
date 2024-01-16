const fs = require('fs');
const path = require('path');

function buildCSSBundle() {
  const stylesDir = path.join(__dirname, 'styles');
  const outputDir = path.join(__dirname, 'project-dist');
  const outputFile = path.join(outputDir, 'bundle.css');

  let stylesContent = [];

  const files = fs.readdirSync(stylesDir);

  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      const filePath = path.join(stylesDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      stylesContent.push(fileContent);
    }
  });

  fs.writeFileSync(outputFile, stylesContent.join('\n'));
  console.log('CSS bundle created successfully.');
}

buildCSSBundle();
