require('dotenv/config')
const PORT = 3001
const express = require('express')
const app = express()
const routes = require('./src/Routes')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(routes)

app.listen(PORT, () => {
  console.log('Servidor online::' + PORT)
})