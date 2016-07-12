var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();
var loginRouter = express.Router();

app.get('/',function(req, res){
  res.sendFile(path.join(__dirname) + '/index.html');
});

app.get('/error',function(req, res){
  res.send('hubo un error');
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

loginRouter.use(function (req,res, next){
  console.log(req.method, req.url);
  next();
});

loginRouter.param('name',function(req,res,next,name){
  if ( name === 'joseluis'){
    req.name = name;
    next();
  }else{
    res.send('No esta registrado');
  }
});

loginRouter.param('password',function(req,res,next,password){
  if ( password === 'peru'){
    req.password = password;
    next();
  }else{
    res.redirect('/error');
    //res.send('el password es incorrecto');
  }
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

loginRouter.get('/',function(req,res){
  res.send('Pagina de login');
});

loginRouter.get('/user/',function(req,res){
  res.send('Pagina de login del usuario');
});

loginRouter.get('/user/:name/:password',function(req,res){
  res.send('Se logeo el usuario ' + req.name);
});

app.use('/admin',adminRouter);
app.use('/login',loginRouter);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
