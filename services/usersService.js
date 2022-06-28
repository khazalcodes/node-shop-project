const usersRepository = require('../data/repositories/usersRepository');

module.exports = {
    getRootUserDetails,
}

async function getRootUserDetails() {
    return usersRepository.getRootUser();
}

