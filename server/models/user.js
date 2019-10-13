const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const config= require('../config');

const userSchema = mongoose.Schema({
  fullName:{ type:String},
  email:{type:String, required: true, unique: true},
  password:{type:String, required: true},
  createdAt:{ type: Date,default: Date.now()}
});

userSchema.methods.generateHash=function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.validatePassword= function(password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJWT= function() {
  const today= new Date();
  const expirationDate= new Date(today);
  expirationDate.setDate(today.getDate()+ 30);

  return jwt.sign({
    email: this.email,
    is: this._id,
    exp: parseInt(expirationDate.getTime()/1000, 10)
  }, process.env.secret);
};

userSchema.plugin(uniqueValidator);

module.exports= mongoose.model('User', userSchema);
