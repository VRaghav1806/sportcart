import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../utils/api';
import './Checkout.css';

function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'credit_card',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const subtotal = cart?.totalAmount || 0;
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cart || cart.items.length === 0) {
            alert('Your cart is empty');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: {
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode,
                        country: formData.country
                    }
                },
                paymentMethod: formData.paymentMethod
            };

            const order = await createOrder(orderData);
            clearCart();
            navigate(`/order-confirmation/${order._id}`);
        } catch (error) {
            console.error('Failed to create order:', error);
            alert(error.message || 'Failed to create order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="empty-state">
                        <h2>Your cart is empty</h2>
                        <p>Add some items to proceed with checkout</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        <span className="gradient-text">Checkout</span>
                    </h1>
                </div>

                <div className="checkout-content">
                    <div className="checkout-form-section">
                        <form onSubmit={handleSubmit} className="checkout-form">
                            {/* Shipping Information */}
                            <div className="form-section glass-card">
                                <div className="section-icon">
                                    <Truck size={24} />
                                </div>
                                <h2 className="section-title">Shipping Information</h2>

                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="input"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="input"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="input"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="street">Street Address *</label>
                                        <input
                                            type="text"
                                            id="street"
                                            name="street"
                                            className="input"
                                            value={formData.street}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="city">City *</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="input"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="state">State *</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            className="input"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="zipCode">ZIP Code *</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            className="input"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="country">Country *</label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            className="input"
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="form-section glass-card">
                                <div className="section-icon">
                                    <CreditCard size={24} />
                                </div>
                                <h2 className="section-title">Payment Method</h2>

                                <div className="payment-methods">
                                    {[
                                        { value: 'credit_card', label: 'Credit Card' },
                                        { value: 'debit_card', label: 'Debit Card' },
                                        { value: 'paypal', label: 'PayPal' },
                                        { value: 'cash_on_delivery', label: 'Cash on Delivery' }
                                    ].map((method) => (
                                        <label key={method.value} className="payment-option">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.value}
                                                checked={formData.paymentMethod === method.value}
                                                onChange={handleChange}
                                            />
                                            <span className="payment-label">{method.label}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Credit/Debit Card Details */}
                                {(formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'debit_card') && (
                                    <div className="card-details-form">
                                        <div className="form-group full-width">
                                            <label htmlFor="cardNumber">Card Number *</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                className="input"
                                                placeholder="0000 0000 0000 0000"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label htmlFor="expiryDate">Expiry Date *</label>
                                                <input
                                                    type="text"
                                                    id="expiryDate"
                                                    name="expiryDate"
                                                    className="input"
                                                    placeholder="MM/YY"
                                                    value={formData.expiryDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cvv">CVV *</label>
                                                <input
                                                    type="password"
                                                    id="cvv"
                                                    name="cvv"
                                                    className="input"
                                                    placeholder="123"
                                                    value={formData.cvv}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* PayPal QR Code */}
                                {formData.paymentMethod === 'paypal' && (
                                    <div className="paypal-qr-section">
                                        <p className="qr-instruction">Scan this QR code to pay with PayPal</p>
                                        <div className="qr-code-container">
                                            <img
                                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.paypal.com/payme/dummy"
                                                alt="PayPal QR Code"
                                                className="qr-code-image"
                                            />
                                        </div>
                                        <p className="qr-note">The order will be processed after payment confirmation.</p>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-large submit-btn"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : `Place Order - ₹${(total || 0).toFixed(2)}`}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary-section">
                        <div className="order-summary glass-card">
                            <h2 className="summary-title">Order Summary</h2>

                            <div className="summary-items">
                                {cart.items.map((item) => (
                                    <div key={item.product._id} className="summary-item">
                                        <div className="item-info">
                                            <span className="item-name">{item.product.name}</span>
                                            <span className="item-quantity">× {item.quantity}</span>
                                        </div>
                                        <span className="item-price">
                                            ₹{((item.price || 0) * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{(subtotal || 0).toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Tax</span>
                                <span>₹{(tax || 0).toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `₹${(shipping || 0).toFixed(2)}`}</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row summary-total">
                                <span>Total</span>
                                <span className="total-amount">₹{(total || 0).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
