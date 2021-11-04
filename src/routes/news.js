const express = require('express')

const newsRouter = express.Router()

const axios = require('axios')


newsRouter.get('/', async (req, res) =>{
    // res.render('news')

    try {
        const keywordsAPI = await axios.get(`https://xieyongchun.com/wp-json/wp/v2/amazon-keywords`)
        // console.log(keywordsAPI.data[0].acf.amazon_product_url)
        res.render('news', { keywords : keywordsAPI.data})
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

    


})
module.exports = newsRouter