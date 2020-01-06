var faker = require('faker');

var csvWriter = require('csv-write-stream')
// var writer = csvWriter()

const numberRestaurants = 50;

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

//?
// imageCarousel.pipe(fs.createWriteStream(__dirname + '/example.csv'))
//?

// var columnsForCarousel = (id) => {
//   return imageCarousel.write({
//     unique_Id: id,
//     restaurant_id: randomizeNum(1, 50),
//     image_title: faker.commerce.productName()
//   })

// };

//? do a for-loop to generate up to a million,
//? then import the CSV file information into my database.

//! The code below will run out of memory; must use DRAIN
/**
// create for loop to make 50 restaurants

// for (var i = 1; i <= 50; i++) {



// create loop for 10 million id's ()
for (var i = 1; i <= 10000000; i++) {

  // var id = randomizeNum(1, 50);


  imageCarousel.write({
    // for each iteration
    // unique_Id: i,
    // restaurant_id: randomizeNum(i, 50),
    restaurant_id: i,
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

*/
//! Above will run out of memory; need to add DRAIN.


var imageMaker = () => {
  var imageMakerObj = {};


  imageMakerObj.restaurant_id = randomizeNum(1, 50);


  imageMakerObj.image_title = faker.commerce.productName();
  imageMakerObj.image_url = 'https://picsum.photos/200/300';
  return imageMakerObj;
}

// let i = 10000000 + 1;

// let i = 1000000 + 1;

// let i = 500000 + 1;

let i = 1000 + 1;
// let i = 50 + 1; // test

imageCarousel.pipe(fs.createWriteStream(__dirname + '/example.csv'))

var imageGenerator = () => {
  let ok = true;

  do {
    i -= 1;
    if (i === 0) {

      // create loop for 10 million id's ()
      // -- for (var i = 1; i <= 50; i++) {

        // var id = randomizeNum(1, 50);


        // imageCarousel.write({
        //   // for each iteration
        //   // unique_Id: i,
        //   // restaurant_id: randomizeNum(i, 50),
        //   restaurant_id: i,
        //   image_title: faker.commerce.productName(),
        //   image_url: 'https://picsum.photos/200/300'

        // })

      // -- }

      // imageCarousel.write(imageMaker());
      console.log('images written using imageMaker; finished populating');


      imageCarousel.end();
    } else {
      // ok = imageCarousel.write(imageMaker());

      // create loop for 10 million id's ()
      //! for (var i = 1; i <= 50; i++) {

        // var id = randomizeNum(1, 50);


        ok = imageCarousel.write({
          // for each iteration
          // unique_Id: i,
          // restaurant_id: randomizeNum(i, 50),
          restaurant_id: i,
          image_title: faker.commerce.productName(),
          image_url: 'https://picsum.photos/200/300'

        })

      //! }
    }
  } while (i > 0 && ok);

  if (i > 0) {
    imageCarousel.once('drain', imageGenerator);
    console.log('DRAIN ACTIVATED!')
  }

};
imageGenerator();




