const { sha256 } = require('js-sha256');
const bx = require('base-x');

const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

const convertToBase58 = (hex) => bx(BASE58).encode(Buffer.from(hex, "hex"));

module.exports = (rdlevel, zip, buffer) => ({
  sha256: convertToBase58(sha256(buffer))
});
