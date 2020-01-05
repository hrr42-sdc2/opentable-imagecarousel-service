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


//produces: hello,foo\nworld,bar\n

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


imageCarousel.pipe(fs.createWriteStream(__dirname + '/example.csv'))


// var columnsForCarousel = (id) => {
//   return imageCarousel.write({
//     unique_Id: id,
//     restaurant_id: randomizeNum(1, 50),
//     image_title: faker.commerce.productName()
//   })

// };

//? do a for-loop to generate up to a million,
//? then import the CSV file information into my database.

// create for loop to make 50 restaurants

for (var i = 1; i <= 50; i++) {



// var id = randomizeNum(1, 50);

imageCarousel.write({
  // for each iteration
  unique_Id: i,
  restaurant_id: randomizeNum(i, 50),
  image_title: faker.commerce.productName(),
  image_url: 'https://picsum.photos/200/300'

})

}
// imageCarousel.pipe(fs.createWriteStream(__dirname + '/example.csv'))





imageCarousel.end()

// I'm expecting:
// unique_id, hash
// restaurant_id, 40
// image_title, 'Cats'