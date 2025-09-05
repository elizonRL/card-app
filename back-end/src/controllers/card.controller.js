const cardModel = require('../models/card.model')



const getAllCards = async (req, res)=>{
    const cards =  await cardModel.find({})
    res.status(200).json({data: cards})
}

const createCard = async (req, res, next)=>{
    try{
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
    }catch(error){
        next(error)
    }
}
const editCard = async (req, res)=>{
    const {cardId} = req.params
    
    const newCard = req.body
    const upDateCard = await cardModel.findByIdAndUpdate(cardId, newCard, {new: true})
    console.log(upDateCard, newCard)
    res.status(200).json(upDateCard)
}

const deletCard = async (req, res)=>{
    const {id} = req.params
    await cardModel.findByIdAndDelete(id)
    res.status(204).send("delete card")
}
module.exports ={
    getAllCards,
    createCard,
    editCard,
    deletCard
}