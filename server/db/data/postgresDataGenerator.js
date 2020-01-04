var faker = require('faker');

var csvWriter = require('csv-write-stream')
// var writer = csvWriter()

// Write 'hello, ' and then end with 'world!'.
const fs = require('fs');


// const file = fs.createWriteStream('./db/data/example.csv');
// file.write('hello, ');
// file.end('world!');
// // Writing more now is not allowed!

//! Here is the test script:
// // csvWriter has been loaded with the: require('csv-write-stream')
// var writer = csvWriter({ headers: ["hello", "foo"]})
// // writer.pipe(fs.createWriteStream('/Users/eivinadlawan/hrr42/sdc-image-carousel/opentable-imagecarousel-service/server/db/data/example.csv'))


// writer.pipe(fs.createWriteStream(__dirname + '/example.csv'))
// writer.write(['world2', 'bar2'])
// writer.end()

// produces: hello,foo\nworld,bar\n

//------------------
//! Here is the real script bellow :

// var writer = csvWriter({ headers: ["id", "restaurantId", "title"]})
// // writer.pipe(fs.createWriteStream('/Users/eivinadlawan/hrr42/sdc-image-carousel/opentable-imagecarousel-service/server/db/data/example.csv'))
// writer.pipe(fs.createWriteStream(__dirname + '/example.csv'))
// writer.write(['world2', 'bar2'])
// writer.end()

// produces: hello,foo\nworld,bar\n

//!

// this loads imageCarousel with: require('csv-write-stream')
var imageCarousel = csvWriter();



// generate 50 restaurants

var restaurantTotal = 50;

// var columnsForCarousel = {'id', 'restaurantId', 'title'};

// get a random integer between two values, inclusive
var randomizeNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}





var columnsForCarousel = (id) => {
  return imageCarousel.write({
    unique_Id: id,
    restaurant_id: randomizeNum(1, 50),
    image_title: faker.commerce.productName()
  })

};

imageCarousel.pipe(fs.createWriteStream(__dirname + '/example.csv'))
var id = 1;



imageCarousel.end()
