var mongoose = require('mongoose');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var User = require('./models/user');
var Pokemon = require('./models/pokemon');

var port = process.env.PORT || 5000;

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

mongoose.connect('mongodb://localhost/pokemon');
//mongoose.connect('mongodb://jonico:jonico@ds023105.mlab.com:23105/heroku_rrm4zt6r');


//API ROUTES
app.get('/', function(req, res) {
    res.send('welcome to zion (Our mother api)');
});

//express  router
var apiRouter = express.Router();

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
            console.log(err);
            if (err) {
                return res.json({
                    success: false,
                    message: 'El nombre de usuario ya existe'
                });
            }
            res.json({
                message: 'usuario registrado'
            });
        });
    })
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) return res.send(err);
            res.json(users);
        })
    });

// Routes /pokemons
apiRouter.route('/pokemons')
    //create a user through POST
    // URL : http://localhost:5000/api/users
    .post(function(req, res) {
        var pokemon = new Pokemon();
        pokemon.name = req.body.name;
        pokemon.type = req.body.type;

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
        Pokemon.find(function(err, poke) {
            if (err) return res.send(err);
            res.json(poke);
        })
    });
apiRouter.route('/pokemons/:pokemon_id')
    .get(function(req, res) {
        Pokemon.findById(req.params.pokemon_id, function(err, poke) {
            if (err) return res.send(err);
            res.json({message: poke.sayHi() });
        });
    })
    .put(function(req, res) {
        Pokemon.findById(req.params.pokemon_id, function(err, poke) {
            if (err) return res.send(err);

            if (req.body.name) poke.name = req.body.name;
            if (req.body.type) poke.type = req.body.type;

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
      },function(err,poke){
        if (err) return res.send(err);
        res.json({ message : 'El pokemon eliminado'});
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
      },function(err,user){
        if (err) return res.send(err);
        res.json({ message : 'El usuario eliminado'});
      })
    })

//Accesed http://localhost:5000/api
apiRouter.get('/', function(req, res) {
    res.json({
        message: 'Stop to try hit me and hit me!'
    });
});

//Register our ROUTES

app.use('/api', apiRouter);

app.listen(port);
console.log('Neo comes over port ' + port);
