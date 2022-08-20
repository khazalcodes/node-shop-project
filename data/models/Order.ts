import {ObjectId} from "mongodb";
import {OrderLine} from "./OrderLine";

export type Order = {
    _id: ObjectId;
    userId: ObjectId;
    orderLines: OrderLine[]
    timestamp: Date
}