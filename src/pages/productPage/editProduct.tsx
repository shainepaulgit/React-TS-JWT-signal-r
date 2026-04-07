import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { Product } from "../../models/product";
import { ProductService } from "../../services/productService";


interface EditProductProps {
    fetchProducts: () => Promise<void>;
    selectedProduct: Product;
    onClose: () => void;
}

const productService = new ProductService();

const EditProduct = ({ fetchProducts, selectedProduct, onClose }: EditProductProps) => {
    console.log(selectedProduct);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Product>();
    useEffect(() => {
        if (selectedProduct) {
            reset(selectedProduct); 
        }
    }, [selectedProduct, reset]); 
    const onUpdate = async (data: Product) => {
        await productService.update(data);
        console.log(`before resetting: ${selectedProduct}`);
        reset(selectedProduct);
        console.log(`after resetting: ${selectedProduct}`);
        onClose();          // close modal
        fetchProducts();    // refresh parent list
    };
    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit(onUpdate)}>
                        <div className="modal-header">
                            <h5 className="modal-title">Update Product</h5>
                            <button type="button" className="btn-close" onClick={onClose} />
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <input
                                    className="form-control"
                                    {...register("name", { required: "Product name is required" })}
                                />
                                {errors.name && <small className="text-danger">{errors.name.message}</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: { value: 1, message: "Price must be greater than 0" },
                                    })}
                                />
                                {errors.price && <small className="text-danger">{errors.price.message}</small>}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;