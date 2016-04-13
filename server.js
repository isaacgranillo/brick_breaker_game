var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));

var PORT = process.env.PORT || 1337;

app.listen(PORT, function(){
	console.log('Connected on port 1337')
});