const moment = require('moment');
const stream = require('stream');
const fs = require('fs');

function createClockFile() {
  try {
    const readableS = new stream.Readable({
      read() {
        setTimeout(() => {
          try {
            const currentTime = moment().toISOString();
            this.push(currentTime);
          } catch (error) {
            console.log('Error: ', error);
            process.exit();
          }
        }, 1000)
      }
    });

    let isFirstLineReady = false; // only to ensure the appearance of the first line in .txt file
    let startedDate = moment(moment().toISOString()).format('MMMM Do YYYY'); // startedDate = 'February 18th 2022'

    const transformS = new stream.Transform({
      transform(chunk, encoding, next) {
        let formattedTime = moment(chunk.toString()).format('MMMM Do YYYY| h:mm:ss a');

        // this part of code provides dots
        if (isFirstLineReady) {
          let currentDate = formattedTime.split('|')[0];// 'MMMM Do YYYY'

          if (currentDate === startedDate) {// example: 'February 18th 2022' === 'February 18th 2022' -> true
            let dots = currentDate.split('').fill('.').join('');
            formattedTime = dots + ' ' + formattedTime.split('|')[1]; // ..................  ??:??:?? pm
          } else {// example: 'February 18th 2022' === 'February 19th 2022' -> false
            // This part provides it 
            /*................  11:59:58 pm
            ..................  11:59:59 pm
            February 19th 2022| 00:00:00 pm
            ..................  00:00:01 pm
            ..................  00:00:02 pm*/
            startedDate = currentDate;
          }
        } else {
          isFirstLineReady = true;
        }
        // ---

        this.push(formattedTime);
        next()
      }
    })

    const noOperation = () => { };
    fs.writeFile('clockFile.txt', '', noOperation);

    const writableS = new stream.Writable({
      write(chunk, encoding, next) {
        fs.appendFile('clockFile.txt', chunk + '\n', next);
      }
    })

    readableS.pipe(transformS).pipe(writableS);
  } catch (error) {
    console.log('Error: ', error);
    process.exit();
  }
}

module.exports = createClockFile;
