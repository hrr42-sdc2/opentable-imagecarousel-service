const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const imageSchema = new mongoose.Schema({

  restaurantId: Number,
  photoId: String,
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

//? Find all photos for a certain restaurantId
var findRestaurantAndPhoto = (restaurantId, photoId) => {
  console.log(`This is the restaurantId: ${restaurantId}`)
  console.log(`This is the photoId: ${photoId}`)

  return Image.find({

    restaurantId: restaurantId,
    photoId: photoId})
  // .exec();
    .then(result => result);
}


//! Original above ^^^
// use photoId in line 7 instead of pictureId?
var addPicture = (samplePhotos) => {
  return Image.create(samplePhotos);
}



var updatePicture = function (originalPhotoId, data) {
  return Image.findByIdAndUpdate(
    originalPhotoId,
    data
  )

  console.log('This is the originalPhotoId: ', originalPhotoId)
  console.log('This is the data: ', data)
  return Image.update(
    // { restaurantId: {$gt: photoId} },
    { photoId: originalPhotoId },
    data
    // { $set: {photoId: newImageId} },
    // { multi: true }
  )


  // const updatePicture = Image.update(
  //   { id: {$gt: imageId} }, //find get
  //   { $set: {id: newImageId} },
  //   { multi: true }
  // )
  // return updatePicture;


  // var image = Image();
  // const updateOnePicture = image.updateOne(
  //   { id: {$gt: imageId} },
  //   { $set: {id: newImageId} },
  //   { multi: true }
  // )
  // return updateOnePicture;

};

//!! RON'S ADDITION FOR THE PUT REQUEST TO UPDATE THE RESERVATION
//format is: findByIdAndUpdate(id, {update}, callback)
//?
// updateReservation = (booking, callback) => {
//   //console.log("this is the booking:", booking);
//   console.log(booking._id);
//   let query = Reservation.findByIdAndUpdate(
//     booking._id,
//     { guests: booking.guests },
//     function(err, result) {
//       if (err) {
//         return err;
//       } else {
//         return result;
//       }
//     }
//   );
//   return query.exec();
// };

//! this my postman req.body
//?
// {
// "_id":"5dfaed3c3144ba52b6c2b2b4",
// "guests":22

// }

//!! END OF THE CHANGE FOR THE PUT REQUEST

var deletePicture = function (originalPhotoId) {
  // return Image.deleteOne(
  //   originalPhotoId,
  //   data
  // )

  // console.log('This is the originalPhotoId: ', originalPhotoId)
  // console.log('This is the data: ', data)
  console.log('This is the photoId: ', originalPhotoId)
  return Image.deleteOne(
    // { restaurantId: {$gt: photoId} },
    { _id: originalPhotoId });

    // { $set: {photoId: newImageId} },
    // { multi: true }

}

// line 30 may need work $set is not setting the new imageId
module.exports = { Image, findRestaurantAndPhoto, addPicture, updatePicture, findById, deletePicture};