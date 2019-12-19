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
  db.addPicture(req.body, () => {
    res.sendStatus(201);
  })
});

app.listen(port, () => {
  console.log(`Port ${port} is listening`);
});


