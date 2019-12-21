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

var addPicture = (pictureId) => {
  return Image.create(pictureId);
}

var updatePicture = function (imageId, newImageId) {
  return Image.update(
    { id: {$gt: imageId} },
    { $set: {id: newImageId} },
    { multi: true }
  );
};
// line 30 may need work $set is not setting the new imageId
module.exports = { Image, addPicture, updatePicture, findById };