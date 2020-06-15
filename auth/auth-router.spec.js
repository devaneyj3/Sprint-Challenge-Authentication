const db = require('../database/bdModel');
const server = require('../api/server');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

describe('Add a new user on register route', () => {

    it('registers a new user', async () => {
        const testUser = {
            id: 3,
            username: "test",
            password: 'test'
        }
        const testUser1 = {
            username: "test1",
            password: 'test1'
        }

        await db.addUser('users', testUser)
        await db.addUser('users', testUser1)

        const users = await db.getUsers();
        
        expect(users).toHaveLength(2)
    })
    it('returns a 201 status code', async () => {
        const testUser = {
            id: 3,
            username: "test",
            password: 'test'
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
        const testUser1 = {
            username: "jordan",
            password: 'test'
        }
        const testUser = {
            username: "Rudolph the red nose reindeer",
            password: 'Santa'
        }
        await db.addUser('users', testUser)
        await db.addUser('users', testUser1)

        const users = await db.getUsers()


        const user = await db.findUser(testUser.username);

        expect(user).toBeTruthy()
    })
    it('returns a 200 status code', async () => {

        const res = await supertest(server)
            .post('/api/auth/login').send({ username: 'test', password: 'test' })
        expect(res.status).toBe(200)
    })
})

describe('test api route for jokes', () => {
    it('Bring back status code 401 if not logged in', async () => {

        const response = await supertest(server)
            .get('/api/jokes')
            .set('Authorization', "jkkl")

        //send a token
        //if I delete the middleware I get 200, so it is blocking my request with the middleware, so I want to somehow have the test send something to validate that I can enter

            expect(response.status).toBe(401)
        })
    it('Bring back status code 200 if logged in', async () => {

        const response = await supertest(server)
            .get('/api/jokes')
                .set('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImciLCJpYXQiOjE1OTIyNDM0OTcsImV4cCI6MTU5MjI0NzA5N30.S9kHXKYAz6Cx3VzDHO3l3L3jeG_l0-kfXE8Xv9SyBac")

        //send a token
        //if I delete the middleware I get 200, so it is blocking my request with the middleware, so I want to somehow have the test send something to validate that I can enter

            expect(response.status).toBe(200)
        })
    it('it returns JSON', () => {
        return supertest(server)
            .get('/api/jokes')
            .set('Authorization', "jkkl")
            .then((res) => {
                expect(res.type).toMatch(/json/i)
            })
    })
})
