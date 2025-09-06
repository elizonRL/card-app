const express = require('express');
const {PORT} = require('./utils/config');
const cardRouter = require('./routers/card.router');
const { unknownEndpoint, errorHandler } = require('./utils/middleware');
const app = express();
const port = PORT;
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

require('./database')
app.use('/api/v1/', cardRouter)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler)
app.use(unknownEndpoint)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;