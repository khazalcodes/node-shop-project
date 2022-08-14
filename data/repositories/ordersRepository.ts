import {Collection, Db, ObjectId} from "mongodb";
const to = require('await-to-js').default;

export default {
    fetchUserOrders,
    createOrder,
    setDb,
}

let db: Db;
let ordersCollection: Collection;

function setDb(mongodbInstance: Db) {
    db = mongodbInstance;
    ordersCollection = db.collection('orders');
}

async function createOrder(userId: string, cartLinesArray: any[]) {
    let err, result;

    [err, result] = await to(ordersCollection.insertOne({
        orderLines: cartLinesArray,
        userId: new ObjectId(userId),
        timestamp: new Date()
    }))

    if (err) console.log(err)

    console.log(userId);

    return result
}

async function fetchUserOrders(userId: string): Promise<Object[]> {
    let err, result;

    const query = { userId: new ObjectId(userId) };
    [err, result] = await to(ordersCollection.find(query).toArray());

    if (err) console.log(err)

    console.log(result)

    return result;
}
