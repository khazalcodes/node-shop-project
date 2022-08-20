import {ObjectId} from "mongodb";

export type Product = {
    title: string,
    imageUrl: string,
    description: string,
    price: number,
    authorId: ObjectId,
    id?: ObjectId
}