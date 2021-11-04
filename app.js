const express = require('express')
const app = express()

const port = 5000

// Static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/img',express.static(__dirname + 'public/img'))
app.use('/js',express.static(__dirname + 'public/js'))


// set template engine to ejs
app.set('views', './src/views')
app.set('view engine', 'ejs')



// Routes
const newsRouter = require('./src/routes/news')

app.use('/', newsRouter)

app.listen(port, ()=>{
    console.log(`Website running on ${port}...`)
})