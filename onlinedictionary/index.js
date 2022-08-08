const express = require('express')
const bodyParser = require('body-parser');
const { HOST, PORT } = require('./config/constant');
const { connection } = require('./config/config');
const router = require('./routes/dictionary.router')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')
app.set('views', __dirname + '/views');

app.use(router)

app.listen(PORT, HOST, () => {
    console.log(`application is running on ${HOST}:${PORT}`)
})

