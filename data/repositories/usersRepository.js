const mongodb = require('mongodb')
const to = require('await-to-js').default;

module.exports = {
    getRootUser,
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

    [err, user] = await to(_getUser(process.env.ROOT_USER_ID))

    if (err) {
        console.log(err);
        user = await _createRootUser();
    }

    return user;
}

async function _getUser(id) {
    let err, user;
    [err, user] = await to(usersCollection.findOne({ _id: new mongodb.ObjectId(id) }))

    if (err) console.log(err);

    user.id = user._id;

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
