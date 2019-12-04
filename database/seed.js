var faker = require('faker');
const numberOfPhotos = 100;
const db = require('./index.js');
const Image = require('./Image.js');

var samplePhotos = [];

for (let i = 0; i <= numberOfPhotos; i++) {
  let samplePhoto = {};
  samplePhoto.restaurantId = 1;
  samplePhoto.photoId = i;
  samplePhoto.photoTitle = faker.commerce.productName();
  samplePhoto.photoUrl = faker.image.food();
  samplePhotos.push(samplePhoto);
}


const insertSamplePhotos = () => {
  Image.create(samplePhotos)
    .then((data) => {
      db.disconnect();
    });
};

insertSamplePhotos();

