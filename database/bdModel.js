const db = require('./dbConfig');

module.exports = {
    addUser,
    getUsers,
    findUserByName
}

function getUsers() {
    return db('users')
}

function addUser(user) {
    return db('users').insert(user)
}

function findUserByName(username) {
    return db('users').where({username}).first() //originally forgot this
}