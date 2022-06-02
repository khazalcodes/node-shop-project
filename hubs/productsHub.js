const CREATE_EVENT = Symbol("create");
const READ_EVENT = Symbol("read");
const UPDATE_EVENT = Symbol("update");
const DELETE_EVENT = Symbol("delete")

// have references to the various objects that want to sub
const subscribers = {};


function publishUpdatedProduct(updatedProduct) {
    // get a handle on all the update subs
    // loop over them sending them messages one by one
    // send them messages
}