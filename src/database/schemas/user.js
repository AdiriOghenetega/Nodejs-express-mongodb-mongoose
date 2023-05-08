const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    password : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    email : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    createdAt : {
        type : mongoose.SchemaTypes.Date,
        required : true,
        default : Date.now()
    }
  });

  module.exports = mongoose.model("users",userSchema)