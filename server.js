var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();


app.get('/',function(req, res){
  res.sendFile(path.join(__dirname) + '/index.html');
});

//Middleware

adminRouter.use(function (req,res, next){
  console.log(req.method, req.url);
  next();
});

adminRouter.param('name',function(req,res,next,name){

  req.name = "Mr Robot was here!";
  console.log("req-name",req.name);
  console.log("name",name);
  next();
});

//rutas
adminRouter.get('/',function(req, res){
  res.send('Estoy en la página principal del admin');
});

adminRouter.get('/users/',function(req, res){
  res.send('Estoy en la página principal del usuarios');
});

adminRouter.get('/users/:name',function(req, res){
  res.send('hola ' + req.name);
});

adminRouter.get('/post',function(req, res){
  res.send('Estoy en la página principal del posts');
});

app.use('/admin',adminRouter);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
