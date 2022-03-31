const path = require('path');
const { findFilesAndSizesInPath } = require('../utils/find');
const { sortAndWriteFilesInTxt } = require('../utils/sortFiles')

let givenDirectory = process.argv[2];// after npm start ...

if (givenDirectory.startsWith('.')) {
  givenDirectory = path.resolve(givenDirectory);
} else {
  givenDirectory = path.normalize(givenDirectory);
}

findFilesAndSizesInPath(givenDirectory).then(filesAndSizes => {
  sortAndWriteFilesInTxt(filesAndSizes, givenDirectory);
});
