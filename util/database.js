const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://sandhyapujari26:nYcTZoks4pkupx2t@cluster0.k0yx23e.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
      console.log('MongoDB Connected!');
      _db = client.db()
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw "No Mongodb database found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
