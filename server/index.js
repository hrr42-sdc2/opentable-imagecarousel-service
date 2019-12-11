const express = require ('express');
const parser = require('body-parser');
const Image = require('../database/Image.js');

let port = process.env.PORT || 3004;

let app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../public'));

app.get('/restaurantid/:id', (req, res) => {
  const restaurantId = Number(req.params.id);
  Image.findById(restaurantId)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      res.end();
    });
});

app.listen(port, () => {
  console.log('Port 3004 is listening');
});


