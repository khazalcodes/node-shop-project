import {CartLineViewModel} from "./CartLineViewModel";

export type CartOverviewViewModel = {
    docTitle: string;
    path: string;
    cartLines: CartLineViewModel[];
    hasCartLines: boolean;
    sumTotal: number ;
}