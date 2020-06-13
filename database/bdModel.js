const db = require('./dbConfig');

module.exports = {
    addUser,
    getUsers
}

function getUsers() {
    return db('users')
}

function addUser(user) {
    return db('users').insert(user)
}