const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email) {
    this.username = username; // Change 'name' to 'username'
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('users')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then(result => {
        console.log(result);
        return result; // Return the found user
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = User;
