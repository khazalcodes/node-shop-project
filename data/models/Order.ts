import {ProductLine} from "./ProductLine";
import {ObjectId} from "mongodb";

export type Order = {
    userId: ObjectId;
    orderLines: ProductLine[]
    timestamp: Date
}