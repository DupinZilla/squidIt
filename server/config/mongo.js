var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/squidIt';

mongoose.connect(connectionString);

var connection = mongoose.connection;

connection.on('open',function(){
    console.log('connection with %s already opened.', connectionString)
})

connection.on('error', console.error.bind(console, 'connection error:'));


module.exports = connection;