var faker = require('faker');
const numberOfPhotos = 100;
const db = require('./index.js');
const Image = require('./Image.js');

let samplePhotos = [];

for (let i = 1; i <= 100; i++) {

  // samplePhoto.photoId = _id;
  console.log('new photoId using underscore: ', samplePhoto.photoId)
  for (let j = 1; j <= numberOfPhotos; j++) {
    let samplePhoto = {};
    samplePhoto.restaurantId = i;
    samplePhoto.photoId = j;
    samplePhoto.photoTitle = `${faker.commerce.productName()}.`;
    samplePhoto.photoDate = `${faker.date.month()} ${Math.floor(Math.random() * 28 + 1)}. ${Math.floor(Math.random() * 9 + 2010)}`;
    samplePhoto.photoDescription = faker.commerce.productMaterial();
    if (i === 1 && j < 11) {
      samplePhoto.src = `https://resizer.otstatic.com/v2/photos/large/243866${j + 83}.jpg`;
    } else {
      samplePhoto.src = `https://source.unsplash.com/collection/597305/480x480/?sig=${Math.round(Math.random() * 3300 + 1)}`;
    }
    samplePhoto.width = 400;
    samplePhoto.height = 400;
    samplePhotos.push(samplePhoto);
  }
}

const insertSamplePhotos = () => {
  Image.create(samplePhotos)
    .then((data) => {
      db.disconnect();
    });
};

insertSamplePhotos();


