/**
 * Generate an id based off the hashes of the files
 */
const HASH_LENGTH = 16;

const b3 = require('blake3');
const _ = require("lodash");

const bx = require('base-x');

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

const convertToBase58 = buf => bx(BASE58).encode(buf);


module.exports = async (rdlevel, zip, buffer) => {
    // filename + blake5 hash pair for each file
    let promises = [];

    zip.forEach( (relativePath, file) => {
        if (!file.dir) {
            // push a IIFE 
            promises.push( (async (file) => {
                const buf = await file.async("nodebuffer");
                const hash = b3.hash(buf, {length: HASH_LENGTH}).toString('base64');
                return file.name + "." + hash;
            })(file) );
        }
    });
    let tokens = await Promise.all(promises);
    // sort the file + hash pairs
    tokens = _.sortBy(tokens);
    const finalHashBuf = b3.hash(_.join(tokens, ""), {length: HASH_LENGTH});
    return {
        id: convertToBase58(finalHashBuf)
    }
}