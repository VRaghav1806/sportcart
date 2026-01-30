import { ShoppingCart, Star, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../utils/api';
import './ProductCard.css';

function ProductCard({ product, onDelete }) {
    const { addToCart } = useCart();
    const { isAdmin } = useAuth();
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (product.stock <= 0) return;

        setIsAdding(true);
        try {
            await addToCart(product._id, 1);
            setTimeout(() => setIsAdding(false), 1000);
        } catch (error) {
            console.error('Failed to add to cart:', error);
            setIsAdding(false);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm('Are you sure you want to delete this product?')) return;

        setIsDeleting(true);
        try {
            await deleteProduct(product._id);
            if (onDelete) onDelete(product._id);
        } catch (error) {
            console.error('Failed to delete product:', error);
            setIsDeleting(false);
            alert('Failed to delete product');
        }
    };

    return (
        <div className="product-card glass-card">
            <Link to={`/products/${product._id}`} className="product-image-link">
                <div className="product-image-wrapper">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1541534741688-6078c65b12db?w=500';
                        }}
                    />
                    {product.featured && (
                        <div className="featured-badge badge badge-warning">Featured</div>
                    )}
                    {product.stock <= 0 && (
                        <div className="out-of-stock-overlay">Out of Stock</div>
                    )}
                    {isAdmin && (
                        <button
                            className={`delete-product-btn ${isDeleting ? 'deleting' : ''}`}
                            onClick={handleDelete}
                            disabled={isDeleting}
                            title="Delete Product"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            </Link>

            <div className="product-info">
                <span className="product-category badge badge-primary">
                    {product.category}
                </span>

                <Link to={`/products/${product._id}`} className="product-name-link">
                    <h3 className="product-name">{product.name}</h3>
                </Link>

                <div className="product-footer">
                    <div className="product-price">
                        <span className="price-currency">₹</span>
                        <span className="price-amount">{(product.price || 0).toFixed(2)}</span>
                    </div>

                    <button
                        className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0 || isAdding}
                    >
                        <ShoppingCart size={18} />
                        {isAdding ? 'Added!' : 'Add'}
                    </button>
                </div>

                <div className="stock-info">
                    {product.stock > 0 && product.stock <= 10 && (
                        <span className="low-stock">Only {product.stock} left!</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
