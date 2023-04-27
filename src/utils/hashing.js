const bcrypt = require('bcrypt');

const hashing = (pass) => {
    return bcrypt.hash(pass, 10).then(function(hash) {
        return hash
    })
}

const compare = (pass, dbPass) => {
    return bcrypt.compare(pass, dbPass).then(function(result) {
        return result
    })
}

module.exports = {hashing, compare}