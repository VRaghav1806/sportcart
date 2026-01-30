import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './Cart.css';

function Cart() {
    const { cart, loading, updateQuantity, removeItem } = useCart();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="skeleton" style={{ height: '400px' }}></div>
                </div>
            </div>
        );
    }

    const isEmpty = !cart || cart.items.length === 0;

    const subtotal = cart?.totalAmount || 0;
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    return (
        <div className="cart-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        Shopping <span className="gradient-text">Cart</span>
                    </h1>
                    {!isEmpty && (
                        <p className="page-subtitle">
                            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
                        </p>
                    )}
                </div>

                {isEmpty ? (
                    <div className="empty-cart">
                        <div className="empty-icon">
                            <ShoppingBag size={80} />
                        </div>
                        <h2>Your cart is empty</h2>
                        <p>Add some amazing sports equipment to get started!</p>
                        <Link to="/products" className="btn btn-primary btn-large">
                            Continue Shopping
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items-section">
                            <div className="cart-items-list">
                                {cart.items.map((item) => (
                                    <CartItem
                                        key={item.product._id}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeItem}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="cart-summary-section">
                            <div className="cart-summary glass-card">
                                <h2 className="summary-title">Order Summary</h2>

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{(subtotal || 0).toFixed(2)}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Tax (10%)</span>
                                    <span>₹{(tax || 0).toFixed(2)}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>
                                        {shipping === 0 ? (
                                            <span className="free-shipping">FREE</span>
                                        ) : (
                                            `₹${(shipping || 0).toFixed(2)}`
                                        )}
                                    </span>
                                </div>

                                {subtotal < 100 && subtotal > 0 && (
                                    <div className="shipping-notice">
                                        Add ₹{(100 - subtotal).toFixed(2)} more for free shipping!
                                    </div>
                                )}

                                <div className="summary-divider"></div>

                                <div className="summary-row summary-total">
                                    <span>Total</span>
                                    <span className="total-amount">₹{(total || 0).toFixed(2)}</span>
                                </div>

                                <button
                                    className="btn btn-primary btn-large checkout-btn"
                                    onClick={() => navigate('/checkout')}
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={20} />
                                </button>

                                <Link to="/products" className="continue-shopping">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
