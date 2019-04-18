const express = require("express")
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.listen(process.env.PORT, () => {
    console.log("server is listening on: ", process.env.PORT)
})