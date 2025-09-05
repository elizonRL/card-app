const { getAllCards, createCard, editCard, deletCard } = require('../controllers/card.controller')

const cardRouter = require('express').Router()

cardRouter.get('/cards', getAllCards)
cardRouter.post('/cards', createCard )
cardRouter.put('/cards/:cardId', editCard)
cardRouter.delete('/cards/:id', deletCard)

module.exports = cardRouter