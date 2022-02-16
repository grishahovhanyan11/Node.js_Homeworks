const fs = require('fs/promises');
const path = require('path');

const filePathsAndSizes = [];

async function findFilesAndSizesInPath(filePath) {// will return array with paths and sizes
  try {
    const filesAndFolders = await fs.readdir(filePath);

    for (let i = 0; i < filesAndFolders.length; i++) {
      const fullPath = path.join(filePath, filesAndFolders[i]);
      const stats = await fs.stat(fullPath);

      if (stats.isDirectory()) {
        if (fullPath[fullPath.lastIndexOf('/') + 1] !== '.') {
          await findFilesAndSizesInPath(fullPath);
          continue;
        }// skip hidden files
      }

      filePathsAndSizes.push([fullPath, stats.size]);
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }

  return filePathsAndSizes;
}

exports.findFilesAndSizesInPath = findFilesAndSizesInPath;
