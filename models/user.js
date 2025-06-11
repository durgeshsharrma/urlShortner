const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseLocal = require('passport-local-mongoose');

const userSchema = new Schema({
    firstName: {
        type : String,
        required: true,
    }
    ,
    lastName : {
        type : String,
        required : true,
    }
    ,
    email : {
        type : String,
        required : true,
    },

    urlShorted : [{
        type : Schema.Types.ObjectId,
        ref : 'urls',

    }]

})


userSchema.plugin(mongooseLocal);


module.exports = mongoose.model('uses' , userSchema);