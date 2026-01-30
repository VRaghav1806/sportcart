import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';
import { fetchOrder } from '../utils/api';
import './OrderConfirmation.css';

function OrderConfirmation() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrder();
    }, [orderId]);

    const loadOrder = async () => {
        try {
            const data = await fetchOrder(orderId);
            setOrder(data);
        } catch (error) {
            console.error('Failed to load order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="order-confirmation-page">
                <div className="container">
                    <div className="skeleton" style={{ height: '400px' }}></div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="order-confirmation-page">
                <div className="container">
                    <div className="error-state">
                        <h2>Order not found</h2>
                        <Link to="/" className="btn btn-primary">Return Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="order-confirmation-page">
            <div className="container">
                <div className="confirmation-header">
                    <div className="success-animation">
                        <CheckCircle size={80} className="success-icon" />
                    </div>
                    <h1 className="confirmation-title">
                        <span className="gradient-text">Order Confirmed!</span>
                    </h1>
                    <p className="confirmation-subtitle">
                        Thank you for your purchase. Your order has been received and is being processed.
                    </p>
                </div>

                <div className="confirmation-content">
                    <div className="order-details glass-card">
                        <div className="detail-section">
                            <div className="section-icon">
                                <Package size={24} />
                            </div>
                            <h2>Order Details</h2>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="detail-label">Order Number</span>
                                    <span className="detail-value order-number">{order.orderNumber}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Order Date</span>
                                    <span className="detail-value">
                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Status</span>
                                    <span className="badge badge-success">{order.status}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Payment Method</span>
                                    <span className="detail-value">
                                        {order.paymentMethod.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="detail-section">
                            <h3>Shipping Address</h3>
                            <div className="address-info">
                                <p>{order.customer.name}</p>
                                <p>{order.customer.email}</p>
                                <p>{order.customer.phone}</p>
                                <p>{order.customer.address.street}</p>
                                <p>
                                    {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zipCode}
                                </p>
                                <p>{order.customer.address.country}</p>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="detail-section">
                            <h3>Order Items</h3>
                            <div className="order-items">
                                {order.items.map((item) => (
                                    <div key={item._id} className="order-item">
                                        <div className="item-details">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-quantity">Qty: {item.quantity}</span>
                                        </div>
                                        <span className="item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>
                                    {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="divider"></div>
                            <div className="summary-row total-row">
                                <span>Total</span>
                                <span className="total-amount">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="confirmation-actions">
                    <Link to="/products" className="btn btn-primary btn-large">
                        Continue Shopping
                    </Link>
                    <Link to="/" className="btn btn-outline btn-large">
                        <Home size={20} />
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmation;
