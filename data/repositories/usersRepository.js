const mongodb = require('mongodb')
const to = require('await-to-js').default;

module.exports = {
    getRootUser,
    getUser,
    setDb,
}

let db;
let usersCollection;

function setDb(mongoDbInstance) {
    db = mongoDbInstance;
    usersCollection = db.collection('users');
}

async function getRootUser() {
    let err, user;

    [err, user] = await to(getUser(process.env.ROOT_USER_ID))

    if (err) {
        console.log(err);
        user = await _createRootUser();
    }

    return user;
}

async function getUser(id) {
    let err, user;

    console.log(id);

    [err, user] = await to(usersCollection.findOne({ _id: new mongodb.ObjectId(id) }))

    if (err) console.log(err);

    return user;
}

async function _createRootUser() {

    let err, result;
    [err, result] = await to(usersCollection.insertOne({
        firstName: 'Root',
        lastName: 'Beer',
        emailAddress: 'root@beer.biz',
        userName: 'ToBeDecided'
    }))

    if (err) console.log(err);

    console.log(result);
    const user = await usersCollection.findOne({ _id: result.insertedId })

    return user
}
