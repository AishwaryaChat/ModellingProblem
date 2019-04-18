const express = require("express")
const bodyParser = require('body-parser')
const handlebars  = require('express-handlebars')

const app = express()

app.use(bodyParser.json())

app.engine('handlebars', handlebars({defaultLayout: 'index'}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
    res.render('home');
})

app.listen(process.env.PORT, () => {
    console.log("server is listening on: ", process.env.PORT)
})