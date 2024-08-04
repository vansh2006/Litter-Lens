const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(bodyParser.json());
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

      //Get the url from the database
    app.post('/detectTrash', async (req, res) => {
      try {
        const { trash_outside } = req.body;
      
        // Get the current time and format it as a string
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
      
        // Create the document
        const document = {
          trash_outside: trash_outside,
          time: time
        };
      
        // Insert document
        const result = await collection.insertOne(document);
        console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`);
        if(trash_outside){
          console.log(`Trash detected at ${time}`);
        }else{
          console.log(`Trash has been inside at ${time}`);
        }
        res.status(200).send('Trash has been detected at ' + time);
    } catch (err) {
      console.error('Error detecting trash:', err);
      res.status(500).send('Error detecting trash');
    }
  });
  

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getGarbageState', (req, res) => {
res.json({"status": garbageState});
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
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    setTimeout(() => run().catch(console.dir), 5000);
  }
}
run().catch(console.dir);