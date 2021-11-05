const express = require('express')
const app = express()
const axios = require('axios')

const port = 5000

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

// create new urls
app.post('/', (req, res, next)=>{

    // {keyword}
    console.log(req.body)
})

app.use('/', newsRouter)

// app.get('c', (req, res,next) =>{
//     res.redirect(301, 'https://google.com/')
// })

function redirectUrl(oldUrl_slug, newUrl) {
    app.get(oldUrl_slug, (req, res, next)=>{
        res.redirect(301, newUrl)
        next()
    })
}

redirectUrl('/test', 'https://google.com/')

async function handle_amazon_redirects() {
    try {
        const keywordsAPI = await axios.get(`https://xieyongchun.com/wp-json/wp/v2/amazon-keywords`)
        let datas = keywordsAPI.data
        datas.forEach(data=>{
            let oldUrl_slug = '/' + data.slug
            let urls = data.acf.amazon_product_url
            urls.forEach(item=>{
                // console.log(oldUrl_slug)
                // console.log(item.url)
                redirectUrl(oldUrl_slug,item.url)

            })
        })
        
    } catch (error) {
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if (error.requiest) {
            console.log(error.requiest)
        } else {
            console.error('Error', error.message)
        }
        
    }
}

handle_amazon_redirects()



app.listen(port, ()=>{
    console.log(`Website running on ${port}...`)
})