const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/oc-imageCarousel');
module.exports = db;


