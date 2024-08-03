const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion } = require('mongodb');

var garbageState = "EMPTY";

//Server Init
app.listen(port, () => console.log('Example app is listening on port 8000.'));

//The majority of the following is code from MongoDB to connect to MongoDB
const uri = "mongodb+srv://kershanarulneswaran:bitterbens@littercluster.fg8lf.mongodb.net/?retryWrites=true&w=majority&appName=LitterCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection;
async function run() {
  try {
    //
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Initialize the database and collection
    const db = client.db('litterdb');
    collection = db.collection('streams');
    console.log("Initialized database and collection.");
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}


run().catch(console.dir);

//Get the url from the database
app.get('/video/:name', async (req, res) => {
  const name = req.params.name;
  console.log(`Received request for video: ${name}`);
  
  try {
    const document = await collection.findOne({ name: name });
    if (document) {
      console.log(`Document found: ${JSON.stringify(document)}`);
      // Send the URL to the client
      res.status(200).send(document.url);
    } else {
      console.log('Document not found');
      res.status(404).send('Document not found');
    }
  } catch (err) {
    console.error('Error retrieving document:', err);
    res.status(500).send('Error retrieving document');
  }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.get('/getGarbageState', (req, res) => {
  res.send(garbageState);
});

app.get('/setFull', (req, res) => {
    try{
        garbageState = "FULL";
        console.log('Garbage is now full');
        res.send('Garbage is now full');
    }catch(err){
        console.error('Error setting garbage to full:', err);
        res.status(500).send('Error setting garbage to full');
  }});

app.get('/setEmpty', (req, res) => {
    try{
        garbageState = "EMPTY";
        console.log('Garbage is now empty');
        res.send('Garbage is now empty');
      }catch(err){
        console.error('Error setting garbage to empty:', err);
        res.status(500).send('Error setting garbage to empty');
      }});