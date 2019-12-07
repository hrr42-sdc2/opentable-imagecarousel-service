const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const imageSchema = new mongoose.Schema({
  restaurantId: Number,
  photoId: Number,
  photoTitle: String,
  src: String,
  width: Number,
  height: Number,
  photoDescription: String
});

const Image = mongoose.model('Image', imageSchema);

var findAll = () => {
  return Image.find().exec();
};

// Image.remove({}, (err) => {
//   console.log(err);
// });


module.exports = Image;
module.exports.findAll = findAll;