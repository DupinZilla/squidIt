var mongoose = require('mongoose');
var instagramSchema = require('./schema')



module.exports = mongoose.model('Instagram',instagramSchema);