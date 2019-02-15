const SignerProvider = require('ethjs-provider-signer');
const sign = require('ethjs-signer').sign;
const Eth = require('ethjs-query');

const provider = new SignerProvider('https://ropsten.infura.io/v3/0b3aae5a0bdb4874aebe9ec91c807223', {
    signTransaction: (rawTx, cb) => cb(null, sign(rawTx, '6db5af595fd15e1b3015032d13a1818250a04d173feccb397085ebf1d78ea4dc')),
    accounts: (cb) => cb(null, ['0xa4082ef83701ebe907523839e58a7bffc5569689']),
  });

const eth = new Eth(provider);

module.exports.eth = eth;