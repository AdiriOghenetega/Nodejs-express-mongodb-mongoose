const mongoose = require('mongoose');

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=> console.log("connected to db"))
.catch(err => console.log(err));

