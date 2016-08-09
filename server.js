var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config= require('./config');
var path = require('path');


//APP CONFIGURATION

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width,content-type,Authorization');
    next();
});

app.use(morgan('dev'));

mongoose.connect(config.database);

//static file location for frontend angular files
app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./app/routes/api')(app,express);
app.use('/api',apiRoutes);

//Main catchall route
//Send user to frontend
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
})

app.listen(config.port);
