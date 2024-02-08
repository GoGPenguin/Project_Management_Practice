const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const moment = require('moment')
const path = require('path')

require('dotenv').config()

const database = require('./config/database')
const systemConfig = require('./config/system')

const route = require("./routes/Client/index.route")
const adminRoute = require('./Routes/admin/index.route')

database.connect();

const app = express()
const port = process.env.PORT

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({
  extended: false
}))

app.set('views', `${__dirname}/Views`)
app.set('view engine', 'pug')

app.use(cookieParser('keyboard cat'))
app.use(session({
  cookie: {
    maxAge: 60000
  }
}))
app.use(flash())

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')))

app.use(express.static(`${__dirname}/public`))



// Routes
route(app)
adminRoute(app)

//Local Var

app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})