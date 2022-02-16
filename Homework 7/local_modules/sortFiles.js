const fs = require('fs');

const writeStream = fs.createWriteStream('sorted_files.txt');

function selectionSortByFileSizes(filesSizesArray) {//descending
  for (let i = 0; i < filesSizesArray.length - 1; i++) {
    let minIndex = 0;
    for (let j = 1; j < filesSizesArray.length - i; j++) {// find  MIN
      if (filesSizesArray[j][1] < filesSizesArray[minIndex][1]) {
        minIndex = j;
      }
    }

    let temp = filesSizesArray[minIndex];
    filesSizesArray[minIndex] = filesSizesArray[filesSizesArray.length - i - 1];
    filesSizesArray[filesSizesArray.length - i - 1] = temp;
  }

  return filesSizesArray;
}

function sizeFromByte(byte) {
  if (byte < 1024) {
    return byte + ' Byte';
  } else if (byte >= 1024 && byte < 1024 ** 2) {
    return (byte / 1024).toFixed(2) + ' KB';
  } else if (byte >= 1024 ** 2 && byte < 1024 ** 3) {
    return (byte / 1024 ** 2).toFixed(2) + ' MB';
  } else if (byte >= 1024 ** 3 && byte < 1024 ** 4) {
    return (byte / 1024 ** 3).toFixed(2) + ' GB';
  } else {
    return (byte / 1024 ** 4).toFixed(2) + ' TB';
  }
}

function drawDot(path, requiredLength) {
  let dots = '';
  while ((path + dots).length !== requiredLength) {
    dots += '.'
  }
  return dots;
}

function sortAndWriteFilesInTxt(filesAndSizes, rootPath) {
  const filesAndSortedSizes = selectionSortByFileSizes(filesAndSizes);

  const pathMaxLength = Math.max(...filesAndSortedSizes.map(file => file[0].length));// Find path with max length
  const pathAndDotFixLength = pathMaxLength - rootPath.length + 5;

  filesAndSortedSizes.forEach(currentFile => {
    const fileSize = sizeFromByte(currentFile[1]);
    const smallPath = currentFile[0].replace(rootPath, '.');
    const dots = drawDot(smallPath, pathAndDotFixLength);

    writeStream.write(`${smallPath}${dots}${fileSize}\n`);
  })
}

exports.sortAndWriteFilesInTxt = sortAndWriteFilesInTxt;
