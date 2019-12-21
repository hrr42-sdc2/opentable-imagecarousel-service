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

app.post('/restaurantid/:id', function(req, res) {
  db.addPicture(req.params.id)
  .then((data) => {
    res.status(201).send('Picture added!');
  })
    .catch((err) => {
      res.status(500).end()
    })
});

app.put('/restaurant/:id/:idToBeUpdated', (req, res) => {
  const restaurantId = Number(req.params.id);
  const idToBeUpdated = Number(req.params.idToBeUpdated);
  const data = req.body;
  console.log(restaurantId, idToBeUpdated);
  db.updatePicture(restaurantId, idToBeUpdated)
    .then((data) => {
      console.log(data);
      res.status(200).send('Picture updated!')
    })
    .catch ((err) => {
    console.log(err)
    res.status(404);
  })
})




app.listen(port, () => {
  console.log(`Port ${port} is listening`);
});


