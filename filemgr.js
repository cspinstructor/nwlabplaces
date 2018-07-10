const {MongoClient} = require('mongodb');
const fs = MongoClient;

//

//const database = 'mongodb://localhost:27017';
//const database = 'mongodb://paulc:abc123@ds117701.mlab.com:17701/placesapp';
//const database = 'mongodb://lab123:lab123@ds259255.mlab.com:59255/weatherapp';
//const database = 'mongodb://paulc:abc123@ds129801.mlab.com:29801/placesdb';
//--const database = 'mongodb://paulc:abc123@ds129801.mlab.com:29801/placesdb';
//const database = 'mongodb://paulchin:abc123@ds233061.mlab.com:33061/placesapp';
// const appname = 'placesapp97';
const database = 'mongodb://placesdb2018:placesdb2018@ds221271.mlab.com:21271/placesdb2018';
const appname = 'placesdb2018';
const collectionname = 'placesappcollection';

const saveData = (newdata) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB');
      }

      console.log('Connected to MongoDB');
      const db = client.db(collectionname);

      const length = newdata.length;
      for(var i=0; i<length; i++) {
        db.collection(collectionname).insertOne(newdata[i], (err, result) => {
          if (err) {
            reject('Unable to insert');
          }

        });
      }

      resolve(1);

      client.close();
    });
  });
};

const getAllData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB');
      }

      console.log('Connected to MongoDB');
      const db = client.db(appname);

      db.collection(collectionname).find().toArray().then( (docs) => {
        resolve(docs);
      }, (err) => {
        reject('Unable to fetch docs');
      });

      client.close();
    });
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB');
      }

      console.log('Connected to MongoDB');
      const db = client.db(appname);

      db.collection(collectionname).remove({}).then( (result) => {
        resolve(result);
      }, (err) => {
        reject('Unable to delete');
      });

      client.close();
    });
  });
};




module.exports = {
  saveData,
  getAllData,
  deleteAll,
}
