
const server = require('../api/server');
const supertest = require('supertest');

describe('test api route for jokes', () => {
    it('Bring back status code 401', async() => {
        const response = await supertest(server).get('/api/jokes');

        expect(response.status).toEqual(401)
        expect(response.body).toEqual({
            you: "shall not pass!"
        })
    })
})