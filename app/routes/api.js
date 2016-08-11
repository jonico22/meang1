var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Pokemon = require('../models/pokemon');
var config = require('../../config');

var superSecret = config.superSecret;

module.exports = function(app,express){
  //express  router
  var apiRouter = express.Router();
  apiRouter.post('/authenticate',function(req,res){
    User.findOne({
      username: req.body.username
    })
    .select('name username password')
    .exec(function(err,user){
      if(err) throw err;
      //username was not found
      if(!user){
        res.json({
          success: false,
          message: 'La autentificacion a fallado. El usuario No existe'
        })
      } else if(user){
        //validate if password matches
        var validPasssword = user.comparePassword(req.body.password)

        if(!validPasssword){
          res.json({
            success : false,
            message: 'La autentificacion a fallado. Contraseña incorrecta'
          })
        } else{
          // if authenticate process is OK then
          //generate a token
          // payload , secretPrivateKey, options ,callback
          var token = jwt.sign({
            name : user.name,
            username : user.username,
          },superSecret,{
            expiresIn : '24h'
          });
          res.json({
            success : true,
            message : 'Acceso Autorizado',
            token: token
          })
        }
      }



    })
  })

  //middleware to verifya token

  /*apiRouter.use(function(req,res,next){
    console.log('alguien ha entrado a la matrix');
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
      //verify token
      jwt.verify(token,superSecret,function(err,decoded){
        if(err){
          return res.json({
            success : false,
            message : "Fallo la autenticacion del token."
          })
        }else{
          console.log(decoded);
          req.decoded = decoded;
          next();
        }
      })
    }else{
      return res.status(403).send({
        success : false,
        message : 'No se envio el token.'
      });
    }

  })*/
  apiRouter.get('/', function(req,res){
    res.json({
      message: "welcome to the matrix",
      user : req.decoded.name
    })
  })


  // Routes /Users
  apiRouter.route('/users')
      //create a user through POST
      // URL : http://localhost:5000/api/users
      .post(function(req, res) {
          var user = new User();
          user.name = req.body.name;
          user.username = req.body.username;
          user.password = req.body.password;

          user.save(function(err) {
              //verifi duplicate entry on username
              if (err) {
                  return res.json({
                      success: false,
                      message: 'El nombre de usuario ya existe'
                  });
              }
              res.json({
                  success: true,
                  message: 'usuario registrado'
              });
          });
      })
      .get(function(req, res) {
          User.find(function(err, users) {
              if (err) return res.send(err);
              res.json(users);
          })
      })
      .put(function(req, res) {
          User.findById(req.params.id, function(err, pearson) {
              if (err) return res.send(err);
              if (req.body.name) pearson.name = req.body.name;
              if (req.body.username) pearson.username = req.body.username;
              if (req.body.password) pearson.password = req.body.password;
              pearson.save(function(err) {
                  if (err) return res.send(err);
                  res.json({
                      success: true,
                      message: 'usuario Actualizado'
                  });
              })
          });
      })
      .delete(function(req, res) {
          User.remove({
              _id: req.params.id
          }, function(err, pearson) {
              if (err) return res.send(err);
              res.json({
                  success : true,
                  message: 'Usuario eliminado'
              });
          })
      })

  // Routes /pokemons
  apiRouter.route('/pokemons')
      //create a user through POST
      // URL : http://localhost:5000/api/users
      .post(function(req, res) {
          var pokemon = new Pokemon();
          pokemon.name = req.body.name;
          pokemon.type = req.body.type;
          pokemon.owner = req.body.owner;

          pokemon.save(function(err) {
              //verifi duplicate entry on username
              console.log(err);
              if (err) {
                  return res.json({
                      success: false,
                      message: 'El pokemon ya existe'
                  });
              }
              res.json({
                  message: 'pokemon registrado'
              });
          });
      })
      .get(function(req, res) {
          /*Pokemon.find(function(err, poke) {
              if (err) return res.send(err);
              res.json(poke);
          })*/
          Pokemon.find({}, function(err, pokemons) {
                  User.populate(pokemons, {
                      path: 'owner',
                      select: { name:1,username:1},
                      match: { username : 'jonico22'}
                  }, function(err, pokemons) {
                      res.status(200).json(pokemons);
                  })
              })
              //.skip(2).limit(3)
              //.sort({name:1}) //asc 1 - desc -1
              .select({
                  name: 1,
                  type: 1,
                  owner: 1
              })
      });
  apiRouter.route('/pokemons/:pokemon_id')
      .get(function(req, res) {
          Pokemon.findById(req.params.pokemon_id, function(err, poke) {
              if (err) return res.send(err);
              res.json({
                  message: poke.sayHi(),
                  count: 'El pokemon ha sido consultado ' + poke.count + ' veces'
              });
          });
      })
      .put(function(req, res) {
          Pokemon.findById(req.params.pokemon_id, function(err, poke) {
              if (err) return res.send(err);

              if (req.body.name) poke.name = req.body.name;
              if (req.body.type) poke.type = req.body.type;
              if (req.body.owner) poke.owner = req.body.owner;
              poke.save(function(err) {
                  if (err) return res.send(err);
                  res.json({
                      message: 'Pokemon Actualizado'
                  });
              })
          });
      })
      .delete(function(req, res) {
          Pokemon.remove({
              _id: req.params.pokemon_id
          }, function(err, poke) {
              if (err) return res.send(err);
              res.json({
                  message: 'El pokemon eliminado'
              });
          })
      })

  apiRouter.route('/pokemons/type/:type')
      .get(function(req, res) {
          Pokemon.find({
              //type: /lectric/
              //type: new RegExp(req.params.type,'i'),
              //name: /chu/i
              $or: [{
                  type: /Electric/i
              }, {
                  type: /Psychic/i
              }],
              /*count : {
                $gt : 0,
                $lt : 10
              }*/
              count: {
                  $in: [1, 0]
              }
          }, function(err, pokemons) {
              res.json({
                  pokemons
              })
          })
      })
  apiRouter.route('/users/:user_id')
      .get(function(req, res) {
          User.findById(req.params.user_id, function(err, user) {
              if (err) return res.send(err);
              res.json(user);
          });
          //search user
          //findOne({prop:value},callback)
      })
      .put(function(req, res) {
          User.findById(req.params.user_id, function(err, user) {
              if (err) return res.send(err);

              if (req.body.name) user.name = req.body.name;
              if (req.body.username) user.username = req.body.username;
              if (req.body.password) user.password = req.body.password;

              user.save(function(err) {
                  if (err) return res.send(err);
                  res.json({
                      message: 'Usuario Actualizado'
                  });
              })
          });
      })
      .delete(function(req, res) {
          User.remove({
              _id: req.params.user_id
          }, function(err, user) {
              if (err) return res.send(err);
              res.json({
                  message: 'El usuario eliminado'
              });
          })
      })

  //Accesed http://localhost:5000/api
  apiRouter.get('/', function(req, res) {
      res.json({
          message: 'Stop to try hit me and hit me!'
      });
  });
  return apiRouter;
}
