const express = require ('express');
const parser = require('body-parser');
const Image = require('../database/Image.js');

let app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../public'));

app.get('/images', (req, res) => {
  Image.findAll()
    .then((data) => {
      res.write(JSON.stringify(data));
      res.end();
    })
    .catch((err) => {
      console.log('Error:', err);
      res.end();
    });
});

app.listen(3000, () => {
  console.log('Port 3000 is listening');
});


