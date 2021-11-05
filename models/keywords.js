const mongoose = require('mongoose');

const kwSchema = new mongoose.Schema({
    keyword: {
        type: String,
    },
    url: {
        type: [String],
    },
    percentage: {
        type: [String]
    }
    
})

const Keyword = mongoose.model('Keyword', kwSchema);
module.exports = Keyword;