const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost');
module.exports = db;


