const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart || { items: [] }; // Initialize cart with an empty array if not provided
    this._id = id;
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

  addToCart(product) {
    const cartProduct = this.cart.items.findIndex(cp => cp._id === product._id);
    product.quantity = 1;
    const updatedCart = { items: [{ proudctId: new mongodb.ObjectId(product._id), quantity: 1 }] };
    const db = getDb();
    return db.collection('users').updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = User;
