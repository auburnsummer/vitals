/*
Upload a file to an IPFS instance.

The IPFS instance, in this scenario, is secured using HTTP Basic Auth.

The IPFS instance api url, username, and password are specified as environment variables.
*/

const FormData = require('form-data');
const axios = require('axios');


/**
 * Upload a buffer onto an IPFS node, and return the Qm hash of it.
 */
const upload = (buffer) => {
  const formData = new FormData();
  formData.append('', buffer);

  const formHeaders = formData.getHeaders();

  return axios.post(`${process.env.IPFS_URL}/add`, formData, {
    headers: {
      authorization: `Basic ${Buffer.from(`${process.env.IPFS_USERNAME}:${process.env.IPFS_PASSWORD}`).toString('base64')}`,
      ...formHeaders,
    },
    params: {
      'cid-version': 1,
    },
  })
    .then((res) => res.data.Hash);
};

module.exports = upload;
