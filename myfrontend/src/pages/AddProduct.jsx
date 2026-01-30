import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Image as ImageIcon, Tag, DollarSign, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { addProduct } from '../utils/api';
import './AddProduct.css';

function AddProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: '',
        stock: '',
        rating: 4.5,
        reviews: 0,
        featured: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Validation
            if (!formData.name || !formData.price || !formData.category || !formData.image) {
                throw new Error('Please fill in all required fields');
            }

            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                rating: parseFloat(formData.rating),
                reviews: parseInt(formData.reviews)
            };

            await addProduct(productData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/products');
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-product-page">
            <div className="form-container glass-card">
                <div className="form-header">
                    <Plus className="header-icon" />
                    <h1>Add New Product</h1>
                    <p>Enter the details of the new sports product</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        <CheckCircle size={20} />
                        <span>Product added successfully! Redirecting...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="add-product-form">
                    <div className="form-section">
                        <div className="input-group">
                            <label htmlFor="name">Product Name *</label>
                            <div className="input-with-icon">
                                <Package size={18} />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Gravity X Cricket Bat"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="input-group">
                                <label htmlFor="price">Price (₹) *</label>
                                <div className="input-with-icon">
                                    <DollarSign size={18} />
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label htmlFor="category">Category *</label>
                                <div className="input-with-icon">
                                    <Tag size={18} />
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Cricket">Cricket</option>
                                        <option value="Football">Football</option>
                                        <option value="Tennis">Tennis</option>
                                        <option value="Basketball">Basketball</option>
                                        <option value="Badminton">Badminton</option>
                                        <option value="Training">Training</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="image">Image URL *</label>
                            <div className="input-with-icon">
                                <ImageIcon size={18} />
                                <input
                                    type="url"
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="stock">Available Stock *</label>
                            <div className="input-with-icon">
                                <Package size={18} />
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="description">Description *</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write a detailed product description..."
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        <div className="checkbox-group">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                                Featured Product
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn" onClick={() => navigate('/products')}>
                            Cancel
                        </button>
                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Adding...' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
