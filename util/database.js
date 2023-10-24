const { MongoClient } = require('mongodb');

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://<uday>:<qy7bOANLhybRvKGH>@cluster0.k9fpmib.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected successfully');
      callback(client);
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = mongoConnect;


