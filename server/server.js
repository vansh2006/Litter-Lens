const express = require('express');

const app = express();

const port = process.env.PORT || 8000;

var garbageState = "EMPTY"; 

app.get('/', (req, res) => {
    res.send('Hello World!');
  });


app.get('/setFull', (req, res) => {
    garbageState = "FULL";
    res.send('Garbage is now full');
  });

app.get('/setEmpty', (req, res) => {
    garbageState = "EMPTY";
    res.send('Garbage is now empty');
  }
);

  app.listen(port, () => console.log('Example app is listening on port 8000.'));

