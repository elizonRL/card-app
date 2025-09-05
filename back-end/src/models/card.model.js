const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    cardId:{
        type:String,
        required: true,
        unique:true
    },
    cardNumber:{
        type:String,
        required: true,
        maxlength:16
        
    },
    name:{
        type:String,
        required: true,
        maxlength:20
    },
    expiry:{
        type:String,
        required: true,
        maxlength:5
    },
    cvc:{
        type:String,
        required: true,
        maxlength:4
    }

})

cardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const cardsModel = mongoose.model('cards', cardSchema)

module.exports = cardsModel; 