const express = require('express')
const app = express()
const axios = require('axios')
const morgan = require('morgan')

app.use(morgan('tiny'))



const session = require('express-session')

app.use(session({
    secret: "thisisnotagoodsecret"
}))

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/amazonKeywords', {useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to mongodb...");
});
const port = 7000

// Static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/img',express.static(__dirname + 'public/img'))
app.use('/js',express.static(__dirname + 'public/js'))


// set template engine to ejs
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))

// Routes
const newsRouter = require('./src/routes/news')

// create new Keyword

const Keyword = require("./models/keywords")
app.post('/', async (req, res, next)=>{

    let keyword = new Keyword({
        keyword: req.body.keyword,
        url: req.body.url,
        percentage: req.body.percentage
    })

    let newKeyword = await keyword.save()
    // console.log(newKeyword)
    res.send(newKeyword)

})

async function getAllKeywordsFromDb () {
    let allKws = await Keyword.find({})

    
    let allKwObjs = []
    allKws.forEach((kw=>{
        let urlObjArr = []

        
        let urlLength = kw.url.length
        
        let kwObj = {}
        kwObj.keyword = kw.keyword
        for (let i = 0; i < urlLength; i++) {
            let urlObj = {}
            urlObj.url = kw.url[i]
            urlObj.percentage = parseInt(kw.percentage[i])

            urlObjArr.push(urlObj)
            kwObj.urlsArr = urlObjArr
        }
        allKwObjs.push(kwObj)     
        
        
    }))

    let tst = allKwObjs.map(kw=>{   
        let sameKw = kw.keyword
        
        let newArrs = kw.urlsArr.map(obj=>{
            let pureArrays = []
            for (let i=0; i<obj.percentage; i++) {
                pureArrays.push(obj.url)
            }

            return pureArrays
        })

        newArrs = [].concat.apply([], newArrs);

        return {
            keyword:sameKw,
            finalUrlArr: newArrs
        }
        
    })

    tst.forEach(item=>{

        let oldUrl = "/" + item.keyword.toLowerCase().replace(/ /g, "-")
        let urlArrays = item.finalUrlArr 
        let urlsQty = urlArrays.length    

        app.get(oldUrl, (req, res)=>{   
            let randIndex = Math.floor(Math.random() * urlsQty)
            let amazonRedirectionUrl = urlArrays[randIndex]
            res.redirect(301, amazonRedirectionUrl)
        })
    })

}

getAllKeywordsFromDb()

app.get('/viewcounts', (req, res,next)=>{
    if (req.session.count) {
        req.session.count ++
    } else  {
        req.session.count = 1
    }
    res.send(`You have viewed this page ${req.session.count} times!`)
})

app.use('/', newsRouter)




app.listen(port, ()=>{
    console.log(`Website running on ${port}...`)
})