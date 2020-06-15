const db = require('./dbConfig');

module.exports = {
    addUser,
    getUsers,
    findUser
}

function getUsers() {
    return db('users')
}

function addUser(text, user) {
    return db(text, 'users').insert(user)
}

function findUser(user) {
    return db('users').where({ 'username': user }).first() //originally forgot this
}