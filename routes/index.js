var express = require('express');
var router = express.Router();
var env = require('node-env-file');


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

env('./.env');
const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;



const findDocuments = function (obj, db, callback) {
  // Get the documents collection
  const collection = db.collection('visualizations');
  // Find some documents
  collection.find(obj).toArray(function (err, docs) {
    assert.equal(err, null);
    //        console.log("Found the following records");
    //        console.log(docs)
    callback(docs);
  });
};

const findDocumentsWithFilter = function (db, filter, callback) {
  // Get the documents collection
  const collection = db.collection('visualizations');
  // Find some documents
  collection.find(filter).toArray(function (err, docs) {
    assert.equal(err, null);
    //        console.log("Found the following records");
    //        console.log(docs)
    callback(docs);
  });
};

function getAllVisualizations(filter, cb) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    findDocumentsWithFilter(db, filter, (data) => {
      cb(data);
      client.close();
    });
  });

}

const insertDocuments = function (data, db, callback) {
  // Get the documents collection
  const collection = db.collection('visualizations');
  // Insert some documents
  collection.insertOne(data, function (err, result) {
    assert.equal(err, null);
    console.log('Inserted document into the collection');
    callback(result);
  });
};

function newVisualization(data, cb) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    findDocuments({
      'nameVisualization': data.nameVisualization
    }, db, (res) => {
      console.log(res);
      if (res.lenght > 0) {
        cb('name visualization already exists');
        console.log('ya existe')
        client.close();        
      }
      else{        
        insertDocuments(data, db, (res) => {
          cb(res);
          client.close();
        });
      }
    });
  });
}

//Pathnames for Visualizations
router.get('/visualizations', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  getAllVisualizations(req.filter, (data) => res.send(data));
});

router.post('/visualizations', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  newVisualization(req.body, (result) => res.send({
    'exists': (result.lenght > 0),
    'result': result
  }));
});


module.exports = router;
