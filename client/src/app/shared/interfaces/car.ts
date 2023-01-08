import { IUser } from "./user";

export interface ICar {
    make: string,
    model: string,
    hp: number,
    imageUrl: string,
    year: string,
    description: string,
    price: number,
    _id: string,
    owner: IUser,
    addedBy: IUser[],
    isUrl: boolean,
}
