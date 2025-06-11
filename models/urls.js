const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { stringify } = require('querystring');


const urlSchema = new mongoose.Schema({
    shortId : {
        type : String,
        required : true,
        unique : true
        
    }

    ,
    redirectUrl  : {
        type : String,
        required : true
    },


    visitHistory : [{
        timeStamp : {type : Number}
    }],

    



}, {timestamps : true},);


module.exports = mongoose.model('url' , urlSchema);