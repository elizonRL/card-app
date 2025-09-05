const { getAllCards, createCard } = require('../controllers/card.controller')

const cardRouter = require('express').Router()

cardRouter.get('/cards', getAllCards)
cardRouter.post('/cards', createCard )

module.exports = cardRouter