const mongoose = require('mongoose');
const shortUrlsSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    code:{
        type:String,
        unique:true
    },
    link:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Urls',shortUrlsSchema)