const mongoose = require('mongoose')
const {MONGO_URL} = require('./utils/config')

mongoose.connect(MONGO_URL).then(() => {
    console.log('Database connected successfully');
  }).catch(error =>{
    console.error(error)
})