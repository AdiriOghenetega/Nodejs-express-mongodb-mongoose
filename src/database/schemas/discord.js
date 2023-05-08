const mongoose = require('mongoose');

const discordSchema = new mongoose.Schema({
    discordID : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    createdAt : {
        type : mongoose.SchemaTypes.Date,
        required : true,
        default : Date.now()
    }
  });

  module.exports = mongoose.model("discord_users",discordSchema)