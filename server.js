
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var User = require('./models/user');

var port = process.env.PORT || 5000;

//APP CONFIGURATION

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());

//CORS

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-Width,content-type,Authorization');
  next();
});

app.use(morgan('dev'));

//mongoose.connect('mongodb://localhost/pokemon');
mongoose.connect('mongodb://jonico:jonico@ds023105.mlab.com:23105/heroku_rrm4zt6r');


//API ROUTES
app.get('/',function(req, res){
  res.send('welcome to zion (Our mother api)');
});

//express  router
var apiRouter = express.Router();

// Routes /Users
apiRouter.route('/users')
//create a user through POST
// URL : http://localhost:5000/api/users
.post(function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;

  user.save(function(err){
    //verifi duplicate entry on username
    console.log(err);
    if(err){
      return res.json({ success : false , message : 'El nombre de usuario ya existe'});
    }
    res.json({message:'usuario registrado'});
  });
})
.get(function(req, res){
  User.find(function(err,users){
    if(err) return res.send(err);
    res.json(users);
  })
});


//Accesed http://localhost:5000/api
apiRouter.get('/',function(req, res){
  res.json({ message: 'Stop to try hit me and hit me!'});
});

//Register our ROUTES

app.use('/api',apiRouter);

app.listen(port);
console.log('Neo comes over port ' + port);
