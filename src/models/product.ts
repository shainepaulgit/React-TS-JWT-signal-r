import type { BaseModel } from "./baseModel";
export interface Product extends BaseModel{
    name: string;
    price: number;
}
export interface ProductInput {
  id?: string;
  name: string;
  price: number;
}