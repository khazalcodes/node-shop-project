import {ObjectId} from "mongodb";

export type OrderLine = {
    quantity: number,
    productId: ObjectId,
    productTitle: string,
    totalPrice: number,
    unitPrice: number
}