const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const scrapController1 = require('../controllers/scrapController') 

const jsonparser = bodyParser.json()
const urlencoded = bodyParser.urlencoded({ exntended: false})

router.get("/", (req, res)=>{
    res.render('home')
})

router.get("/exp",  urlencoded, scrapController1.getExcel)
router.post("/exp",  urlencoded, scrapController1.getExcel)
router.post("/search", urlencoded, scrapController1.getPrice)

module.exports = router