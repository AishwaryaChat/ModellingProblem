const express = require("express")
const bodyParser = require('body-parser')
const handlebars  = require('express-handlebars')

const { addCabData, editCabData, assignCab } = require('./controllers/cabs')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.engine('handlebars', handlebars({defaultLayout: 'index'}))
app.set('view engine', 'handlebars')

app.post('/cab', addCabData)
app.put('/cab/:id', editCabData)
app.put('/cab/assign/:latitude/:longitude/:type', assignCab)


app.get('/', function (req, res) {
    res.render('home');
})

app.listen(process.env.PORT, () => {
    console.log("server is listening on: ", process.env.PORT)
})