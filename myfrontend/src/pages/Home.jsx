import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Trophy, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../utils/api';
import './Home.css';

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFeaturedProducts();
    }, []);

    const loadFeaturedProducts = async () => {
        try {
            const products = await fetchProducts({ featured: true });
            setFeaturedProducts(products.slice(0, 4));
        } catch (error) {
            console.error('Failed to load featured products:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'Basketball', icon: '🏀', color: 'hsl(15, 95%, 55%)' },
        { name: 'Soccer', icon: '⚽', color: 'hsl(145, 65%, 50%)' },
        { name: 'Tennis', icon: '🎾', color: 'hsl(45, 95%, 55%)' },
        { name: 'Running', icon: '👟', color: 'hsl(200, 95%, 45%)' },
        { name: 'Fitness', icon: '💪', color: 'hsl(280, 70%, 55%)' },
        { name: 'Apparel', icon: '👕', color: 'hsl(320, 65%, 50%)' }
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background"></div>
                <div className="container hero-content">
                    <div className="hero-text animate-fade-in">
                        <div className="hero-badge">
                            <Sparkles size={16} />
                            <span>Premium Sports Equipment</span>
                        </div>
                        <h1 className="hero-title">
                            Elevate Your
                            <span className="gradient-text"> Performance</span>
                        </h1>
                        <p className="hero-description">
                            Discover top-quality sports gear designed for champions. From basketball to fitness,
                            we've got everything you need to reach your peak performance.
                        </p>
                        <div className="hero-actions">
                            <Link to="/products" className="btn btn-primary btn-large">
                                Shop Now
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/products" className="btn btn-outline btn-large">
                                Explore Products
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card glass-card animate-slide-in">
                            <div className="feature-icon" style={{ background: 'var(--gradient-primary)' }}>
                                <Trophy size={28} />
                            </div>
                            <h3>Premium Quality</h3>
                            <p>Only the finest sports equipment from top brands worldwide</p>
                        </div>
                        <div className="feature-card glass-card animate-slide-in" style={{ animationDelay: '100ms' }}>
                            <div className="feature-icon" style={{ background: 'var(--gradient-secondary)' }}>
                                <Zap size={28} />
                            </div>
                            <h3>Fast Shipping</h3>
                            <p>Free express delivery on orders over $100</p>
                        </div>
                        <div className="feature-card glass-card animate-slide-in" style={{ animationDelay: '200ms' }}>
                            <div className="feature-icon" style={{ background: 'var(--gradient-accent)' }}>
                                <Sparkles size={28} />
                            </div>
                            <h3>Best Prices</h3>
                            <p>Competitive pricing with exclusive member discounts</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Shop by Category</h2>
                        <p className="section-subtitle">Find exactly what you need</p>
                    </div>
                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <Link
                                key={category.name}
                                to={`/products?category=${category.name}`}
                                className="category-card glass-card"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <span className="category-icon" style={{ background: category.color }}>
                                    {category.icon}
                                </span>
                                <h3 className="category-name">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <p className="section-subtitle">Hand-picked just for you</p>
                    </div>

                    {loading ? (
                        <div className="products-grid">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '400px' }}></div>
                            ))}
                        </div>
                    ) : (
                        <div className="products-grid">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onDelete={(id) => setFeaturedProducts(featuredProducts.filter(p => p._id !== id))}
                                />
                            ))}
                        </div>
                    )}

                    <div className="section-cta">
                        <Link to="/products" className="btn btn-secondary">
                            View All Products
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
