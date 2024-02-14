const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const moment = require('moment')
const path = require('path')
const http = require('http');
const { Server } = require("socket.io");


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

const server = http.createServer(app);
const io = new Server(server); 

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)
})


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

app.get("*", (req, res) => {
  res.render("client/pages/errors/404", {
    titlePage: '404 Not Found'
  })
})

server.listen(port, () => {
  console.log(`http://localhost:${port}`)
})