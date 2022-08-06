import {ObjectId} from "mongodb";
import {Cart} from "./Cart";

export type User = {
    id?: ObjectId,
    firstName: string,
    lastName: string
    emailAddress: string
    userName: string
    cart: Cart
}