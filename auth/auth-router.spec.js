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

describe('test the login route', () => {
    it('gets the users in the database', async () => {
        const username = "Rudolph the red nose reindeer";

        const expectedBody = {
            
            id: 1,
                username: 'Rudolph the red nose reindeer',
                    password: '$2b$10$y7hFIa8Z.5Il/NOqvXz/VOcnyeS24bKgDaOWPkrzrye3zXpakRYGS'
        
        }


        const user = await db.findUserByName(username);
        console.log(user)

        expect(user).toContainEqual(expectedBody)
    })
    it('returns a 200 status code', async () => {
        const res = await supertest(server).post('/api/auth/login');

        expect(res.status).toBe(200)
    })
})