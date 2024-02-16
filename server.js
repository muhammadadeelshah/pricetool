const express = require('express')
const app = express()
const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const xlsx = require("xlsx")
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const cors = require("cors")
const port = 3000

const Handlebars = require("handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const insecureHandlebars = allowInsecurePrototypeAccess(Handlebars)

app.engine('hbs', exphbs.engine({
    extname: 'hbs', 
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs');
app.set('views', './views');

const jsonparser = bodyParser.json()
const urlencoded = bodyParser.urlencoded({ exntended: false})

app.use(cors())
app.use(urlencoded)

app.use("/", require(path.join(__dirname, "./routes/webRoutes")))

app.listen(port, ()=>{
    console.log("Server Started .... " + port)
})