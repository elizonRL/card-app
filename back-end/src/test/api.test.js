const supertest = require('supertest');
const { describe, test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const app = require('../app'); // Adjust the path as necessary
const cardsModel = require('../models/card.model');

const request = supertest(app);

const newCard = { number: '5439826262345678', name: 'John Doe', expiry: '12/25', cvc: '123' };

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
        const response = await request.post('/api/v1/cards')
        .send(newCard);
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.data.name, newCard.name);
        assert.strictEqual(response.body.data.number, newCard.number);
        assert.strictEqual(response.body.data.expiry, newCard.expiry);
        assert.strictEqual(response.body.data.cvc, newCard.cvc);
    });
    test('should return 400 for POST /api/v1/cards with invalid data', async () => {
        const response = await request.post('/api/v1/cards').send({});
        assert.strictEqual(response.status, 400);
    });
    
    test('should get all cards with GET /api/v1/cards', async () => {
        // First create a card
        await request.post('/api/v1/cards').send(newCard);
        
        const response = await request.get('/api/v1/cards');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(Array.isArray(response.body.data), true);
        assert.strictEqual(response.body.data.length, 1);
        assert.strictEqual(response.body.data[0].name, newCard.name);
    });
    
    test('should delete a card with DELETE /api/v1/cards/:id', async () => {
        // First create a card
        const createResponse = await request.post('/api/v1/cards').send(newCard);
        const cardId = createResponse.body.data._id;
        
        // Then delete it
        const deleteResponse = await request.delete(`/api/v1/cards/${cardId}`);
        assert.strictEqual(deleteResponse.status, 200);
        
        // Verify it's deleted
        const getResponse = await request.get('/api/v1/cards');
        assert.strictEqual(getResponse.body.data.length, 0);
    });
    
    test('should return 404 for DELETE /api/v1/cards/:id with non-existent id', async () => {
        const fakeId = '507f1f77bcf86cd799439011';
        const response = await request.delete(`/api/v1/cards/${fakeId}`);
        assert.strictEqual(response.status, 404);
    });
    
    test('should return 400 for DELETE /api/v1/cards/:id with invalid id format', async () => {
        const invalidId = 'invalid-id';
        const response = await request.delete(`/api/v1/cards/${invalidId}`);
        assert.strictEqual(response.status, 400);
    });

});
after(async () => {
    await mongoose.connection.close()
})

