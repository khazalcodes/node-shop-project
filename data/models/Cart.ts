import {CartLine} from "./CartLine";

export type Cart = {
    cartLines: { [key: string]: CartLine }
}