const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/project2', {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                            // useFindAndModify: false,
                            // useCreateIndex: true
                          });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("MongoDB Connected...");
});

module.exports = db
