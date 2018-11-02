const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function decrypt(file, password ) {
  // First, get the initialization vector from the file.
  const readVect = fs.createReadStream(file, { end: 15 });

  let initVect;
  readVect.on('data', (chunk) => {
    initVect = chunk;
  });

  readVect.on('close', () => {
    const key = crypto.createHash('sha256').update(password).digest();
    const readStream = fs.createReadStream(file, { start: 16 });
    const decipher = crypto.createDecipheriv('aes256', key, initVect);
    const unzip = zlib.createUnzip();
    const writeStream = fs.createWriteStream(file + '.dec');

    readStream
      .pipe(decipher)
      .pipe(unzip)
      .pipe(writeStream);
  });
}

module.exports = decrypt

// decrypt(process.argv[2], process.argv[3])
