const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
var db = mongoose.connect('mongodb://localhost/oc-imageCarousel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = db;


