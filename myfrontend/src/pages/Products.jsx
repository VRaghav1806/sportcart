import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../utils/api';
import './Products.css';

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const categoryParam = searchParams.get('category') || '';

    const categories = ['All', 'Basketball', 'Soccer', 'Tennis', 'Running', 'Fitness', 'Apparel', 'Cricket', 'Badminton', 'Accessories'];

    useEffect(() => {
        loadProducts();
    }, [categoryParam, searchQuery]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const query = {};
            if (categoryParam && categoryParam !== 'All') {
                query.category = categoryParam;
            }
            if (searchQuery.trim()) {
                query.search = searchQuery.trim();
            }
            const data = await fetchProducts(query);
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        if (category === 'All') {
            setSearchParams({});
        } else {
            setSearchParams({ category });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadProducts();
    };

    return (
        <div className="products-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        {categoryParam || 'All'} <span className="gradient-text">Products</span>
                    </h1>
                    <p className="page-subtitle">
                        {products.length} {products.length === 1 ? 'product' : 'products'} available
                    </p>
                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-input-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </form>
                </div>

                {/* Category Filters */}
                <div className="category-filters">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-chip ${(category === 'All' && !categoryParam) || categoryParam === category
                                ? 'active'
                                : ''
                                }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="products-grid">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="skeleton" style={{ height: '400px' }}></div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🔍</div>
                        <h2>No products found</h2>
                        <p>Try adjusting your search or filter criteria</p>
                        <button className="btn btn-primary" onClick={() => {
                            setSearchQuery('');
                            setSearchParams({});
                        }}>
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onDelete={(id) => setProducts(products.filter(p => p._id !== id))}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
