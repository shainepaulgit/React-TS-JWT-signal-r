import { useState, useEffect } from "react";
import type { Product } from "../../models/product";
import { ProductService } from "../../services/productService";
import EditProduct from "./editProduct";
import { productHub } from "../../services/productHubService";

const productService = new ProductService();

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    productHub.start();
    productHub.onAdd((product: Product) => {
      setProducts((prev) => [...prev,product])
    });
     productHub.onUpdate((p) =>
      setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)))
    );
    productHub.onDelete((id) =>
      setProducts((prev) => prev.filter((x) => x.id !== id))
    );

   // return () => productHub.stop();
  }, []);

  const handleDelete = async () => {
    if (!selectedProduct) return;
    await productService.delete(selectedProduct.id);
    setShowDelete(false);
    fetchProducts();
  };

  return (
    <div className="container mt-3">
      <h5>Product List</h5>

      {loading ? (
        <span>Loading...</span>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>₱ {item.price}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setSelectedProduct(item);
                      setShowEdit(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setSelectedProduct(item);
                      setShowDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showEdit && selectedProduct && (
        <EditProduct
          fetchProducts={fetchProducts}
          selectedProduct={selectedProduct}
          onClose={() => setShowEdit(false)}
        />
      )}
      {showDelete && selectedProduct && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button className="btn-close" onClick={() => setShowDelete(false)} />
              </div>
              <div className="modal-body">
                Are you sure you want to delete <strong>{selectedProduct.name}</strong>?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDelete(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;