const express = require('express')

const route = require("./routes/Client/index.route")

const app = express()
const port = 3000

app.set('views', './Views')
app.set('view engine', 'pug')

// Routes
route(app)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})