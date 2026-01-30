import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Home, Grid3x3, PlusSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LogIn, Shield } from 'lucide-react';
import './Header.css';

function Header() {
    const { cartCount } = useCart();
    const { user, logoutUser, isAdmin } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text gradient-text">SportsCart</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="nav-desktop">
                    <Link to="/" className="nav-link">
                        <Home size={18} />
                        Home
                    </Link>
                    <Link to="/products" className="nav-link">
                        <Grid3x3 size={18} />
                        Products
                    </Link>
                    {isAdmin && (
                        <Link to="/admin/add-product" className="nav-link">
                            <PlusSquare size={18} />
                            Add Product
                        </Link>
                    )}
                </nav>

                {/* Cart & Auth & Mobile Menu Button */}
                <div className="header-actions">
                    {user ? (
                        <div className="user-menu-desktop">
                            {isAdmin && <Shield size={16} className="admin-icon" title="Admin" />}
                            <span className="user-name">{user.name}</span>
                            <button onClick={logoutUser} className="auth-button logout" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="auth-button login" title="Login">
                            <LogIn size={20} />
                        </Link>
                    )}
                    <Link to="/cart" className="cart-button">
                        <ShoppingCart size={22} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    <button
                        className="mobile-menu-button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
                <Link
                    to="/"
                    className="nav-link-mobile"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <Home size={20} />
                    Home
                </Link>
                <Link
                    to="/products"
                    className="nav-link-mobile"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <Grid3x3 size={20} />
                    Products
                </Link>
                {isAdmin && (
                    <Link
                        to="/admin/add-product"
                        className="nav-link-mobile"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <PlusSquare size={20} />
                        Add Product
                    </Link>
                )}
                {user ? (
                    <button
                        className="nav-link-mobile logout-mobile"
                        onClick={() => {
                            logoutUser();
                            setMobileMenuOpen(false);
                        }}
                    >
                        <LogOut size={20} />
                        Logout ({user.name})
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="nav-link-mobile"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <LogIn size={20} />
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
}

export default Header;
