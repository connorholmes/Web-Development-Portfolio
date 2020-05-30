const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

const url = 'mongodb://localhost:4000/';
const dbName = 'fruitsDB';
const client = new MongoClient(url, { useUnifiedTopology: true});

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected to database...")
    const db = client.db(dbName);
    insertDocuments(db, function() {
        client.close();
    })
    
});



var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
      {name : "Apple"}, 
      {name : "Orange"}, 
      {name : "Banana"}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

