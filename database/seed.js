var faker = require('faker');
const numberOfPhotos = 100;
const db = require('./index.js');
const Image = require('./Image.js');

var samplePhotos = [];
var id = 0;

for (let i = 84; i <= 93; i++) {
  let samplePhoto = {};
  samplePhoto.restaurantId = 100;
  samplePhoto.photoId = id;
  samplePhoto.photoTitle = `${faker.commerce.productName()}. ${faker.date.month()} ${Math.floor(Math.random() * 28 + 1)}. ${Math.floor(Math.random() * 9 + 2010)}`,
  samplePhoto.photoDescription = faker.commerce.productMaterial(),
  samplePhoto.src = `https://resizer.otstatic.com/v2/photos/large/243866${i}.jpg`;
  samplePhoto.width = 400;
  samplePhoto.height = 400;
  samplePhotos.push(samplePhoto);
  id++;
}


const insertSamplePhotos = () => {
  Image.create(samplePhotos)
    .then((data) => {
      db.disconnect();
    });
};

insertSamplePhotos();


