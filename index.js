const express = require('express')
require('dotenv').config()

const route = require("./routes/Client/index.route")

const app = express()
const port = process.env.PORT

app.set('views', './Views')
app.set('view engine', 'pug')

app.use(express.static("public"))

// Routes
route(app)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})