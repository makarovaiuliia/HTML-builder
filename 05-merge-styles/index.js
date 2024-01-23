const fs = require('fs').promises;
const path = require('path');

async function buildCSSBundle() {
  const stylesDir = path.join(__dirname, 'styles');
  const outputDir = path.join(__dirname, 'project-dist');
  const outputFile = path.join(outputDir, 'bundle.css');

  let stylesContent = [];

  try {
    const files = await fs.readdir(stylesDir);

    for (const file of files) {
      if (path.extname(file) === '.css') {
        const filePath = path.join(stylesDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        stylesContent.push(fileContent);
      }
    }

    await fs.writeFile(outputFile, stylesContent.join('\n'));
    console.log('CSS bundle created successfully.');
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

buildCSSBundle();
