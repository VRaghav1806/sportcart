import { Github, Twitter, Instagram, Heart } from 'lucide-react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <span className="logo-icon">⚡</span>
                            <span className="gradient-text">SportsCart</span>
                        </div>
                        <p className="footer-description">
                            Your premium destination for top-quality sports equipment and apparel.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Shop</h4>
                        <ul className="footer-links">
                            <li><a href="/products">All Products</a></li>
                            <li><a href="/products?category=Basketball">Basketball</a></li>
                            <li><a href="/products?category=Soccer">Soccer</a></li>
                            <li><a href="/products?category=Running">Running</a></li>
                            <li><a href="/products?category=Fitness">Fitness</a></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Support</h4>
                        <ul className="footer-links">
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Shipping Info</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Track Order</a></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        Made with <Heart size={16} className="heart-icon" /> by SportsCart Team
                    </p>
                    <p>&copy; 2024 SportsCart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
