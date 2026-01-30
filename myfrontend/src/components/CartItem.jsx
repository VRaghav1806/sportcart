import { Minus, Plus, X } from 'lucide-react';
import './CartItem.css';

function CartItem({ item, onUpdateQuantity, onRemove }) {
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > item.product.stock) {
            alert(`Only ${item.product.stock} items available in stock`);
            return;
        }
        onUpdateQuantity(item.product._id, newQuantity);
    };

    return (
        <div className="cart-item glass-card">
            <div className="cart-item-image">
                <img src={item.product.image} alt={item.product.name} />
            </div>

            <div className="cart-item-details">
                <h3 className="cart-item-name">{item.product.name}</h3>
                <span className="cart-item-category badge badge-primary">
                    {item.product.category}
                </span>
                <p className="cart-item-price">${(item.price || 0).toFixed(2)} each</p>
            </div>

            <div className="cart-item-actions">
                <div className="quantity-controls">
                    <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        aria-label="Decrease quantity"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        aria-label="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <p className="cart-item-total">
                    ${((item.price || 0) * item.quantity).toFixed(2)}
                </p>

                <button
                    className="remove-btn"
                    onClick={() => onRemove(item.product._id)}
                    aria-label="Remove item"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
