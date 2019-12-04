const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const imageSchema = new mongoose.Schema({
  restaurantId: Number,
  photoId: Number,
  photoTitle: String,
  photoUrl: String
});

const Image = mongoose.model('Image', imageSchema);

var findAll = () => {
  return new Promise((resolve, reject) => {
    Image.find()
      .exec((err, data) => {
        resolve(data);
      });
  });
};

module.exports = Image;
module.exports.findAll = findAll;