const express = require('express')
require('dotenv').config()

const database = require('./config/database')

const route = require("./routes/Client/index.route")
const adminRoute = require('./Routes/admin/index.route')

database.connect();

const app = express()
const port = process.env.PORT


app.set('views', './Views')
app.set('view engine', 'pug')

app.use(express.static("public"))

// Routes
route(app)
adminRoute(app)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})