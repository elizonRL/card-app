require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URI_DEV


module.exports ={
    PORT,
    MONGO_URL
}