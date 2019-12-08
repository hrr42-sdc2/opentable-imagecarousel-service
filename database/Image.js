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

var findById = (restaurantId) => {
  return Image.find({restaurantId})
    .exec();
};


module.exports = Image;
module.exports.findById = findById;