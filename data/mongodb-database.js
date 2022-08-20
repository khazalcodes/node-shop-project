require('dotenv').config();

const mongodb = require('mongodb');
const to = require('await-to-js').default;

module.exports = {
    mongoConnect,
}

async function mongoConnect() {
    const MongoClient = mongodb.MongoClient;

    let err, connection;

    [err, connection] = await to(MongoClient.connect(process.env.MONGODB_URL));

    if (err) {
        console.log(err);
        throw "UNCONNECTED"
    }

    return connection.db();
}
