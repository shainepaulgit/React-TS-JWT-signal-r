import { BaseHubService } from "./BaseHubService";
import type { Product, ProductInput } from "../models/product";
// Server-to-client and client-to-server events
interface ProductHubClientEvents {
  Add: (product: Product) => void;
  Update: (product: Product) => void;
  Delete: (id: string) => void;
  GetPrice: (price: number) => void;
}

interface ProductHubServerMethods {
  Create: (input: ProductInput) => Promise<void>;
  UpdateProduct: (input: ProductInput) => Promise<void>;
  DeleteProduct: (id: string) => Promise<void>;
}
export class ProductHubService extends BaseHubService<ProductHubClientEvents, ProductHubServerMethods> {
  constructor() {
    super("https://localhost:5001/producthub");
  }

  // ===== CLIENT EVENTS =====
  onAdd(callback: (product: Product) => void) {
    this.on("Add", callback);
  }

  onUpdate(callback: (product: Product) => void) {
    this.on("Update", callback);
  }

  onDelete(callback: (id: string) => void) {
    this.on("Delete", callback);
  }

  onPrice(callback: (price: number) => void) {
    this.on("GetPrice", callback);
  }

  // ===== SERVER METHODS =====
  async create(input: ProductInput) {
    return this.invoke("Create", input);
  }

  async update(input: ProductInput) {
    return this.invoke("UpdateProduct", input);
  }

  async deleteProduct(id: string) {
    return this.invoke("DeleteProduct", id);
  }
}

export const productHub = new ProductHubService();