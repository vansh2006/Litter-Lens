const express = require('express');

const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(port, () => console.log('Example app is listening on port 8000.'));

//Following is code from MongoDB to connect to MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kershanarulneswaran:bitterbens@littercluster.fg8lf.mongodb.net/?retryWrites=true&w=majority&appName=LitterCluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//Use AWS to connect to MongoDB
const AWS = require('aws-sdk');
const fs = require('fs');

//set region to us-east-1
AWS.config.update({ region: 'us-east-1' });

// S3 bucket 
const s3 = new AWS.S3{
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}