# crypto-file

encrypt and decrypt all files, like: pdf, txt, avi, mkv, jpeg, png etc

## Installation

```bash
npm install --save crypto-file
```

### Encrypt Usage

```js
const cryptoFile = require('crypto-file');

cryptoFile.encrypt('./test.jpg', 'your-awsome-pwd');
```

#### Decrypt Usage

```js
const cryptoFile = require('crypto-file');

cryptoFile.decrypt('./test.jpg.enc', 'your-awsome-pwd')
```
