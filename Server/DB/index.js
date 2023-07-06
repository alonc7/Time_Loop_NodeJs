const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017/TimeLoop'; //  MongoDB connection and database name

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.log('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database');

  // Add your API routes and logic here

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

