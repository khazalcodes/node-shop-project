require('dotenv').config();

const mongodb = require('mongodb');
const to = require('await-to-js').default;

module.exports = {
    mongoConnect,
    getDb
}

let _db;

async function mongoConnect() {
    const MongoClient = mongodb.MongoClient;

    let err, connection;

    [err, connection] = await to(MongoClient.connect(process.env.MONGODB_URL));

    if (err) console.log(err);
    else console.log('Connected to the Mongolian database');

    _db = connection.db();
}

function getDb() {
    if (_db) return _db;
    throw 'No database found!';
}


