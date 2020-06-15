const db = require('../database/bdModel');
const server = require('../api/server');
const supertest = require('supertest');

describe('Add a new user on register route', () => {

    it('registers a new user', async () => {
        const testUser = {
            username: "Rudolph the red nose reindeer",
            password: 'I love santa'
        }

        await db.addUser('users',testUser)

        const users = await db.getUsers();
        expect(users).toHaveLength(1)
    })
    it('returns a 201 status code', async () => {
        const testUser = {
            id: 1,
            username: "Rudolph the red nose reindeer",
            password: 'I love santa'
        }
        const response = await supertest(server).post('/api/auth/register').send(testUser);

        expect(response.status).toBe(201)
    }),
        beforeEach(async () => {
            await db.getUsers().truncate()
        })
})

describe('test the login route', () => {
    it('gets the users in the database', async () => {
       
        const testUser = {
            id: 1,
            username: "Rudolph the red nose reindeer",
            password: 'I love santa'
        }
        const user1 = {
            id: 2,
            username: 'billy',
            password: 'test'
        }

        const user2 = {
            id: 3,
            username: 'bill',
            password: 'you'
        }
        await db.addUser('users', user1);
        await db.addUser('users', user2)


        const user = await db.findUser(testUser.username);

        expect(user).toBeTruthy()
    })
    it('returns a 200 status code', async () => {
        const user1 = {
            id: 4,
            username: 'billyee',
            password: 'test'
        }

        await db.addUser('users', user1);

        const res = await supertest(server).post('/api/auth/login').send(user1);

        expect(res.status).toBe(200)
    })
})