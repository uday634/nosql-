const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://kumar:x3XuWFDdBhBzTYW2@cluster0.k9fpmib.mongodb.net/cart?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('successfully Connected to the mondodb');
      _db = client.db()
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'No databse found:'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

