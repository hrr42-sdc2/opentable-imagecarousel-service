const express = require ('express');
const parser = require('body-parser');
const db = require('../database/Image.js');
const cors = require('cors');



let port = process.env.PORT || 3004;

let app = express();

app.use(cors());
app.use(parser.json());
app.use(express.static(__dirname + '/../public'));
console.log('====================');

//! Original
app.get('/restaurantid/:id', (req, res) => {
  const restaurantId = Number(req.params.id);
  db.findById(restaurantId)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      res.end();
    });
});


//? Get all photos for a certain restaurantId
app.get('/restaurantid/:id/:photoId', (req, res) => {
  const restaurantId = Number(req.params.id);
  const photoId = String(req.params.photoId);
  db.findRestaurantAndPhoto(restaurantId, photoId)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      res.end();
    });
});


app.post('/restaurantid/:id', function(req, res) {
  db.addPicture(req.body) //send request to db
  .then((data) => { //receive data back from db
    //send success status if succesful

    res.status(201).send('Picture added!');
  })
    //catch error if failure
    .catch((err) => {
      res.status(500).end()
    })
});



// app.put('/restaurantid/:id/:idToBeUpdated', (req, res) => {
  app.put('/restaurantid/', (req, res) => {
  // const restaurantId = Number(req.params.id);
  // const idToBeUpdated = Number(req.params.idToBeUpdated);
  const {_id, ...rest} = req.body;

  // console.log(`Original restaurantId: null, and new ID to replace the Original: ${idToBeUpdated}`);
  console.log('this is the UPDATED req.body : ', rest)
  console.log(`Original restaurantId: ${_id}`);
  db.updatePicture(_id, rest)
  //server is requesting the database using db.updatePicture request to get the imageId using
    .then((data) => {
      // console.log('Status, Showing number \'n\' of documents matching restaurantId, number of documents nModified: ',data);

      console.log('This shows the modified photo with all of its details prior to changing the title: ',data);
      res.status(200).send('Picture updated!')
    })
    .catch ((err) => {
    console.log(err)
    res.status(404);
  })
})

//!! RON'S ADDITION FOR THE PUT REQUEST TO UPDATE THE RESERVATION
//PUT is update: mongo _id field is included in the object res, use
//Maybe use:
//https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/
//or https://docs.mongodb.com/manual/reference/method/db.collection.update/
//db.collection.replaceOne(), or db.collection.update()
//?
// app.put('/reservation', function (req, res) {
//   const booking = req.body;
//   console.log(booking);
//   //const time = req.params.restaurant_time;
//   // res.send(booking)
//   Reservation.updateReservation(booking)
//     .then((notification) => {
//       // console.log(notification);
//       // console.log(booking);
//       res.write(JSON.stringify(notification));
//       res.end();
//     })
//     .catch((err) => {
//       console.log('Error occurred: ', err);
//       res.status(500).send(new Error(err));
//       res.end();
//     });
//   // res.send("Updated!");
// });

//!! END OF PUT REQUEST ADDED BY RON

app.delete('/restaurantid/', (req, res) => {
  // const restaurantId = Number(req.params.id);
  // const idToBeUpdated = Number(req.params.idToBeUpdated);
  // const {_id, ...rest} = req.body;
  const entry = req.body;
  // const entry = req.params._id
  console.log(entry._id)

  // console.log(`Original restaurantId: null, and new ID to replace the Original: ${idToBeUpdated}`);
  // console.log('this is the UPDATED req.body : ', rest)
  // console.log(`Original restaurantId: ${_id}`);
  // db.collection(_id).deleteOne({_id, rest})

  db.deletePicture(entry._id)
  //server is requesting the database using db.updatePicture request to get the imageId using
    .then((data) => {
      // console.log('Status, Showing number \'n\' of documents matching restaurantId, number of documents nModified: ',data);

      console.log('This shows the deleted photo with all of its details: ',data);
      res.status(200).send('Poof! Picture deleted!')
    })
    .catch ((err) => {
    console.log(err)
    res.status(404);
  })
})

app.listen(port, () => {
  console.log(`Port ${port} is listening`);
});


