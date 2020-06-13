const db = require('../database/bdModel');
const server = require('../api/server');
const supertest = require('supertest');

describe('Add a new user on register route', () => {
    const testUser = {
        username: "Rudolph the red nose reindeer",
        password: 'I love santa'
    }
    it('registers a new user', async () => {

        await db.addUser(testUser)

        const users = await db.getUsers();
        expect(users).toHaveLength(1)
    })
    it('returns a 201 status code', async () => {
        const testUser = {
            username: "Rudolph the red nose reindeer",
            password: 'I love santa'
        }
        const response = await supertest(server).post('/api/auth/register').send(testUser);

        expect(response.status).toBe(201)
    }), 

    beforeEach(async() => {
        await db.getUsers().truncate()
    })
})