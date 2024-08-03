const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const Grid = require('gridfs-stream');
const { MongoClient, ServerApiVersion } = require('mongodb');

var garbageState = "EMPTY"; 

//Following is code from MongoDB to connect to MongoDB
const uri = "mongodb+srv://kershanarulneswaran:bitterbens@littercluster.fg8lf.mongodb.net/?retryWrites=true&w=majority&appName=LitterCluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let gfs;
async function run() {
  //connect client
  try{
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const db = client.db("LitterCluster"); // Replace with your database name
    gfs = Grid(db, MongoClient);
    gfs.collection('fs'); // Name of the GridFS collection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

}
run().catch(console.dir);

//Get the video from frames in MongoDB
app.get('/video', async(req, res) =>{
  try{
    //Frame
    const file = await gfs.files.findOne({filename: 'frame.jpg'});
    if(!file || !file.filename){
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    const readStream = gfs.createReadStream({filename: file.filename});
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'inline; filename="video.mp4"');
    readStream.pipe(res);
    console.log("Streaming Video...")
  }catch(err){
    console.error(err);
    res.status(500).send();
  }

});

app.get('/', (req, res) => {
    res.send('Hello World!');
  });


app.get('/setFull', (req, res) => {
    garbageState = "FULL";
    console.log('Garbage is now full');
    res.send('Garbage is now full');
  });

app.get('/setEmpty', (req, res) => {
    garbageState = "EMPTY";
    console.log('Garbage is now empty');
    res.send('Garbage is now empty');
  }
);

app.listen(port, () => console.log('Example app is listening on port 8000.'));