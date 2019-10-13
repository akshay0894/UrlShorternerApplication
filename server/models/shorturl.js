const mongoose = require('mongoose');

const shortUrlSchema= mongoose.Schema({
  shorturl: {type: String, required: true},
  longurl: {type: String, required:true},
  createdAt:{type:Date, default: Date.now()}
})

module.exports= mongoose.model('ShortUrl', shortUrlSchema);
