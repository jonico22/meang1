// Packages

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user
var UserSchema = new Schema({
  name : String,
  username: {
    type : String,
    required : true,
    index:{
      unique : true
    }
  },
  password : {
    type:String,
    required:true,
    select:false
  }
});

UserSchema.pre('save',function(next){
  var user = this;

  //if the password not changed then continue
  if(!user.isModified('password')) return next();

  //Generate tash
  bcrypt.hash(user.password,null,null,function(err,hash){
    if(err) return next(err);
    //change the password to he hashed version
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password,user.password);
}

module.exports = mongoose.model('User',UserSchema);
