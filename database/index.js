const mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/oc-imageCarousel'
var db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
module.exports = db;


