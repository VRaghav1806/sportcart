import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, ArrowLeft, ShieldCheck, Truck, RefreshCw, Trash2 } from 'lucide-react';
import { fetchProduct, deleteProduct } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isAdmin } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const data = await fetchProduct(id);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!product || product.stock <= 0) return;

        setIsAdding(true);
        try {
            await addToCart(product._id, quantity);
            setTimeout(() => setIsAdding(false), 1500);
        } catch (err) {
            console.error('Failed to add to cart:', err);
            setIsAdding(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        setIsDeleting(true);
        try {
            await deleteProduct(product._id);
            navigate('/products');
        } catch (err) {
            console.error('Failed to delete product:', err);
            alert('Failed to delete product');
            setIsDeleting(false);
        }
    };

    if (loading) return <div className="loading-container"><div className="loader"></div></div>;
    if (error) return <div className="error-container"><h2>Error</h2><p>{error}</p><button onClick={() => navigate('/products')}>Back to Products</button></div>;
    if (!product) return <div className="not-found">Product not found</div>;

    return (
        <div className="product-detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className="product-detail-container">
                <div className="product-visuals">
                    <div className="main-image-wrapper glass-card">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="main-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1541534741688-6078c65b12db?w=800';
                            }}
                        />
                        {product.featured && <div className="featured-badge">Featured</div>}
                    </div>
                </div>

                <div className="product-details-content">
                    <div className="product-header">
                        <span className="category-badge">{product.category}</span>
                        <h1 className="product-title">{product.name}</h1>
                    </div>

                    <div className="product-price-section">
                        <span className="price">₹{product.price.toFixed(2)}</span>
                        {product.stock > 0 ? (
                            <span className="stock-status in-stock">
                                {product.stock < 10 ? `Only ${product.stock} left in stock` : 'In Stock'}
                            </span>
                        ) : (
                            <span className="stock-status out-of-stock">Out of Stock</span>
                        )}
                    </div>

                    <p className="product-description">{product.description}</p>

                    <div className="purchase-controls">
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>-</button>
                            <span className="quantity-value">{quantity}</span>
                            <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}>+</button>
                        </div>

                        <button
                            className={`add-to-cart-action ${isAdding ? 'adding' : ''}`}
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0 || isAdding}
                        >
                            <ShoppingCart size={20} />
                            {isAdding ? 'Added to Cart!' : 'Add to Cart'}
                        </button>

                        {isAdmin && (
                            <button
                                className={`delete-product-action ${isDeleting ? 'deleting' : ''}`}
                                onClick={handleDelete}
                                disabled={isDeleting}
                                title="Delete Product"
                            >
                                <Trash2 size={20} />
                                {isDeleting ? 'Deleting...' : 'Delete Product'}
                            </button>
                        )}
                    </div>

                    <div className="trust-badges">
                        <div className="trust-item">
                            <Truck size={24} />
                            <span>Free Shipping</span>
                        </div>
                        <div className="trust-item">
                            <ShieldCheck size={24} />
                            <span>Authenticity Guaranteed</span>
                        </div>
                        <div className="trust-item">
                            <RefreshCw size={24} />
                            <span>30-Day Returns</span>
                        </div>
                    </div>

                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div className="specifications">
                            <h3>Specifications</h3>
                            <div className="specs-grid">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="spec-row">
                                        <span className="spec-label">{key}</span>
                                        <span className="spec-value">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
