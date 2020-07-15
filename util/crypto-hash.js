const crypto = require ('crypto')

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256')

    hash.update(inputs.sort().join(' '));
    //Digest representa el resultado del has
    return hash.digest('hex')
};

module.exports = cryptoHash