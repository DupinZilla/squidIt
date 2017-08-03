var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var InstagramSchema = Schema({

    timestamp : {type:Date,default: Date.now},
    hashtag: { type: String },
    image: [
        {
            width: { type: Number },
            height: { type: Number },
            url: { type: String }
        }
    ]
});

module.exports = InstagramSchema;