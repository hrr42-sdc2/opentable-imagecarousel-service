const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const imageSchema = new mongoose.Schema({
  restaurantId: Number,
  photoId: Number,
  photoTitle: String,
  photoDate: String,
  src: String,
  width: Number,
  height: Number,
  photoDescription: String
});

const Image = mongoose.model('Image', imageSchema);

//! Original
var findById = (restaurantId) => {
  return Image.find({restaurantId})
    .exec();
};

//! Original above ^^^

var addPicture = (singlePicture, cb) => {
  Image.create(singlePicture, (err, carousel) => {
    if (err) throw err;
    cb();
  })
}

var updatePicture = (query, newPicture, cb) => {
  carousel.update(query, newPicture, (err, data) => {
    if (err) throw err;
    cb();
  })
};

module.exports = { Image, addPicture };
module.exports.findById = findById;