const axios = require('axios')
const cheerio = require('cheerio')
const xlsx = require("xlsx")
var returnData = ""

exports.getExcel = ()=>{
    jsonData = returnData
    console.log('Convert JSON to Excel')
    console.log(jsonData)
    const worksheet = xlsx.utils.json_to_sheet(jsonData)
    const workbook = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(workbook, worksheet, 'webdata')
    xlsx.write(workbook, {bookType: 'xlsx', type: 'buffer'})
    xlsx.write(workbook, {bookType: 'xlsx', type: 'binary'})
    xlsx.writeFile(workbook, "webdata.xlsx")
}

exports.getPrice = async (req, res, next) => {
    // var findProduct = "valentines card"
    // console.log(req.body)
    var findProduct = req.body.s1
    var portal = req.body.s2
    if (portal=='1'){
        returnData = await getAmazone(findProduct)
        // console.log(returnData)
        res.render("search", {data: returnData})
    }else{
        var returnData = {name: 'Not Found', price: 0}
        res.render("search", {data: returnData})
    }    
}

const getAmazone = async (findProduct) => {
    var url = "https://www.amazon.com/s?k=" + findProduct + "&crid=3LCD9CE4EQ0JF&sprefix=" + findProduct + "%2Caps%2C334&ref=nb_sb_noss_2";    
        try{
            const response = await axios.get(url)
            const htmlData = response.data
            var games = [{name: "", price: ""}]
            const $ = cheerio.load(htmlData)
            $("div.puisg-col.puisg-col-4-of-12.puisg-col-8-of-16.puisg-col-12-of-20.puisg-col-12-of-24.puis-list-col-right").each((index, el)=>{
                const game = $(el)
                var vtitle = game.find('span.a-size-medium.a-color-base.a-text-normal').text()
                // var vlink = game.find('.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal').text()
                var vpriceSymbol = game.find('.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-price-symbol').text()
                var vprice = game.find('.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-price-whole').text()
                var vdecimal = game.find('.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-price-fraction').text()
                var vtotalPrice = vpriceSymbol + " " + vprice+vdecimal
                var vfinal = game.find('.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-offscreen').text()
                var vtotalPrice = vfinal
                games.push({name: vtitle, price: vtotalPrice})        
            })    

            $("div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small").each((index, el)=>{
                const game = $(el)
                var vtitle = game.find('span.a-size-base-plus.a-color-base.a-text-normal').text()
                var vlink = game.find('.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal').text()
                var vpriceSymbol = game.find('.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-price-symbol').text()
                var vprice = game.find('.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-price-whole').text()
                var vdecimal = game.find('.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-price-fraction').text()
                var vtotalPrice = vpriceSymbol + " " + vprice + vdecimal
                var vfinal = game.find('.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-offscreen').text()
                var vtotalPrice = vfinal
                games.push({name: vtitle, price: vtotalPrice})        
            })        
            // convertJSONtoExcel(games);        
            return games
        }
        catch(error){
            console.log(error)
        }
}
