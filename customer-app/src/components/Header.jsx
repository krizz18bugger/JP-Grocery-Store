import { ShoppingCart, Search, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" className="header__brand">
        <div className="header__logo-icon">
          <Leaf size={18} strokeWidth={2.5} />
        </div>
        <div className="header__brand-text">
          <span className="header__brand-name">JP Integrated</span>
          <span className="header__brand-sub">Farm</span>
        </div>
      </Link>

      <div className="header__search">
        <Search size={15} className="header__search-icon" />
        <input
          type="text"
          placeholder="தேடுங்கள்..."
          className="header__search-input"
        />
      </div>

      <Link to="/cart" className="header__cart" aria-label="View cart">
        <ShoppingCart size={20} strokeWidth={2} />
        {totalItems > 0 && (
          <span className="header__cart-badge">{totalItems}</span>
        )}
      </Link>
    </header>
  );
};

export default Header;
