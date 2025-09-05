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

module.exports ={
    getAllCards,
    createCard
}