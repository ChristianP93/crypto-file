const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const gzip = zlib.createGzip();

const Vect = require('./vect');

function encrypt(file, password ) {
  const initVect = crypto.randomBytes(16);
  const CIPHER_KEY = crypto.createHash('sha256').update(password).digest();
  const readStream = fs.createReadStream(file);
  const cipher = crypto.createCipheriv('aes256', CIPHER_KEY, initVect);
  const appendInitVect = new Vect(initVect);
  const writeStream = fs.createWriteStream(path.join(file + ".enc"));

  readStream
    .pipe(gzip)
    .pipe(cipher)
    .pipe(appendInitVect)
    .pipe(writeStream);
}


module.exports = encrypt

// encrypt( process.argv[2].toString(), process.argv[3].toString() );
