const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    number:{
        type:String,
        required: true,
        maxlength:19
        
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