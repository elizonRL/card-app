const supertest = require('supertest');
const { describe, test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const app = require('../app'); // Adjust the path as necessary
const cardsModel = require('../models/card.model');

const request = supertest(app);

beforeEach(async () => {
  await cardsModel.deleteMany({})
});

describe('GET /', () => {
    test('should return Hello World', async () => {
        const response = await request.get('/');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.text, 'Hello World!');
    });
    test('should return 404 for non-existent route', async () => {
        const response = await request.get('/non-existent-route');
        assert.strictEqual(response.status, 404);
    });
    test('should return empty array for GET /api/v1/cards when no cards exist', async () => {
        const response = await request.get('/api/v1/cards');
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.body, { data: []});
    });
    test('should create a new card with POST /api/v1/cards', async () => {
        const newCard = { cardId: '1', cardNumber: '543982626', name: 'John Doe', expiry: '12/25', cvc: '123' };
        const response = await request.post('/api/v1/cards')
        .send(newCard);
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.name, newCard.name);
        assert.strictEqual(response.body.description, newCard.description);
    });

});
after(async () => {
    await mongoose.connection.close()
})

