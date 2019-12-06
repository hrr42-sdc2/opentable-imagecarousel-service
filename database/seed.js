var faker = require('faker');
const numberOfPhotos = 100;
const db = require('./index.js');
const Image = require('./Image.js');

var samplePhotos = [];

for (let i = 0; i <= numberOfPhotos; i++) {
  let samplePhoto = {};
  samplePhoto.restaurantId = 100;
  samplePhoto.photoId = i;
  samplePhoto.photoTitle = `${faker.commerce.productName()}. ${faker.date.month()} ${Math.floor(Math.random() * 28 + 1)}. ${Math.floor(Math.random() * 9 + 2010)}`,
  samplePhoto.photoDescription = faker.commerce.productMaterial(),
  samplePhoto.src = `https://ot-foodspotting-production.s3.amazonaws.com/reviews/${4179610 + i}/thumb_600.jpg`;
  samplePhoto.width = 400;
  samplePhoto.height = 400;
  samplePhotos.push(samplePhoto);
}


const insertSamplePhotos = () => {
  Image.create(samplePhotos)
    .then((data) => {
      db.disconnect();
    });
};

insertSamplePhotos();

