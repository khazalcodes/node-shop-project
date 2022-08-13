import {ProductLine} from "./ProductLine";

export type Cart = {
    cartLines: { [key: string]: ProductLine }
}