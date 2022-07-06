require('dotenv').config();

const mongodb = require('mongodb');
const to = require('await-to-js').default;

exports.mongoConnect = async function() {
    const MongoClient = mongodb.MongoClient;

    let err, connection;

    [err, connection] = await to(MongoClient.connect(process.env.MONGODB_URL));

    if (err) console.log(err);
    else console.log('Connected to the Mongolian database');

    return connection
}
