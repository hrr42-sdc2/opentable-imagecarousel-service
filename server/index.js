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
  db.addPicture(req.body)
    .then((data) => {
    res.status(201).send('Picture added!');
  })
    .catch((err) => {
      res.status(500).end()
    })
});

app.put('/restaurant/:id', (req, res) => {
  const restaurantId = Number(req.params.id);
  const data = req.body;

  db.update(restaurantId, data)
    .then((data) => {
      res.sendStatus(200).send('Picture updated!')
    })
    .catch ((err) => {
    console.log(err)
    res.sendStatus(404).end
  })
})




app.listen(port, () => {
  console.log(`Port ${port} is listening`);
});


