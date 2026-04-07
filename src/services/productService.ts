import { BaseService } from "../services/baseService";
import type { Product } from "../models/product";
export class ProductService extends BaseService<Product>{
    constructor(){
        super("/api/product");
    }
    async getPrice(id: string):Promise<number>{
        try{
            const product = await this.getById(id);
            return product.price;
        }
        catch(err: unknown){
            this.handleError(err);
            throw err;
        }

    }
}