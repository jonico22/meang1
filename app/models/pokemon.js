// Packages

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// user
var PokemonSchema = new Schema({
    name: {
        type: String,
        required: true,
        default : 'no name',
        index: {
            unique: true
        }
    },
    type: {
        type: String,
        required: true
    },
    count : {
      type: Number,
      default : 0,
    },
    owner : {
      type: Schema.ObjectId,
      ref : 'User',
    }
});
PokemonSchema.post('findOne',function(poke){
  poke.count ++;
  poke.save();
});

PokemonSchema.methods.sayHi = function() {
    var pokemon = this;
    return 'Hola , soy un ' + pokemon.name + ' de tipo ' + pokemon.type;
}

module.exports = mongoose.model('Pokemon', PokemonSchema);
