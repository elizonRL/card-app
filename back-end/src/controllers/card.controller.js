const cardModel = require('../models/card.model')

const getAllCards = async (req, res)=>{
    const cards =  await cardModel.find({})
    res.status(200).json({data: cards})
}

const createCard = async (req, res)=>{
    const {
        cardId,
        cardNumber,
        name,
        expiry,
        cvc

    }= req.body

    const newCard = new cardModel({cardId, cardNumber, name, expiry, cvc})
    await newCard.save()
    res.status(201).json(newCard)
}
const editCard = (req, res)=>{
    const {cardId} = req.params
    res.status(200).json(cardId)
}

const deletCard = (req, res)=>{
    const {cardId} = req.params
    res.status(204).send("delete card")
}
module.exports ={
    getAllCards,
    createCard,
    editCard,
    deletCard
}