const path = require('path');
const { findFilesAndSizesInPath } = require('../local_modules/find');
const { sortAndWriteFilesInTxt } = require('../local_modules/sortFiles')

let givenDirectory = process.argv[2];

if (givenDirectory.startsWith('.')) {
  givenDirectory = path.resolve(givenDirectory);
} else {
  givenDirectory = path.normalize(givenDirectory);
}

findFilesAndSizesInPath(givenDirectory).then(filesAndSizes => {
  sortAndWriteFilesInTxt(filesAndSizes, givenDirectory);
});
