var csvWriter = require('csv-write-stream')
// var writer = csvWriter()

// Write 'hello, ' and then end with 'world!'.
const fs = require('fs');


// const file = fs.createWriteStream('./db/data/example.csv');
// file.write('hello, ');
// file.end('world!');
// // Writing more now is not allowed!

//! Here is the test script:

var writer = csvWriter({ headers: ["hello", "foo"]})
// writer.pipe(fs.createWriteStream('/Users/eivinadlawan/hrr42/sdc-image-carousel/opentable-imagecarousel-service/server/db/data/example.csv'))
writer.pipe(fs.createWriteStream(__dirname + '/example.csv'))
writer.write(['world3', 'bar3'])
writer.end()

// produces: hello,foo\nworld,bar\n

//------------------
//! Here is the real script bellow :

var writer = csvWriter({ headers: ["id", "restaurantId", "title"]})
// writer.pipe(fs.createWriteStream('/Users/eivinadlawan/hrr42/sdc-image-carousel/opentable-imagecarousel-service/server/db/data/example.csv'))
writer.pipe(fs.createWriteStream(__dirname + '/example.csv'))
writer.write(['world2', 'bar2'])
writer.end()

// produces: hello,foo\nworld,bar\n