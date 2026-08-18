import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const WHATSAPP_NUMBER = '919876543210';

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const lines = cartItems
      .map(
        (item) =>
          `• ${item.name} — ${item.quantity} x ₹${item.price} = ₹${item.price * item.quantity}`
      )
      .join('\n');

    const message =
      `Hello JP Farm, I would like to place an order:\n\n${lines}\n\nTotal Amount: ₹${cartTotal}\n\nPlease confirm my order. 🙏`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="cart-page">

      {/* ── Header ── */}
      <div className="cart-page__header">
        <button className="cart-page__back" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        <h1 className="cart-page__title">உங்கள் கூடை</h1>
        <span className="cart-page__count">
          {cartItems.length > 0 ? `${cartItems.length} பொருட்கள்` : ''}
        </span>
      </div>

      {/* ── Empty State ── */}
      {cartItems.length === 0 && (
        <div className="cart-page__empty">
          <ShoppingBag size={56} strokeWidth={1.2} color="var(--stroke)" />
          <p className="cart-page__empty-title">உங்கள் கூடை காலியாக உள்ளது</p>
          <p className="cart-page__empty-sub">பொருட்களை தேர்ந்தெடுத்து கூடையில் சேர்க்கவும்</p>
          <Link to="/" className="cart-page__shop-link">
            தொடர்ந்து கடை பார்க்க →
          </Link>
        </div>
      )}

      {/* ── Items List ── */}
      {cartItems.length > 0 && (
        <>
          <ul className="cart-page__list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-page__item">

                {/* Thumbnail */}
                <div className="cart-item__thumb">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="cart-item__img" />
                  ) : (
                    <span className="cart-item__emoji">{item.emoji || '🌿'}</span>
                  )}
                </div>

                {/* Info */}
                <div className="cart-item__info">
                  <p className="cart-item__name">{item.name}</p>
                  <p className="cart-item__unit-price">₹{item.price} / item</p>

                  {/* Qty Controls */}
                  <div className="cart-item__qty">
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Decrease"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="cart-qty-val">{item.quantity}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Increase"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Right */}
                <div className="cart-item__right">
                  <p className="cart-item__subtotal">₹{item.price * item.quantity}</p>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove"
                  >
                    <Trash2 size={15} />
                    <span>நீக்கு</span>
                  </button>
                </div>

              </li>
            ))}
          </ul>

          {/* ── Footer ── */}
          <div className="cart-page__footer">
            <div className="cart-page__summary">
              <div className="cart-page__summary-row">
                <span>உப மொத்தம்</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="cart-page__summary-row cart-page__summary-row--total">
                <span>மொத்த தொகை</span>
                <span className="cart-page__total-val">₹{cartTotal}</span>
              </div>
            </div>

            <button className="cart-page__whatsapp-btn" onClick={handleWhatsAppCheckout}>
              <MessageCircle size={20} />
              WhatsApp-ல் ஆர்டர் செய்ய
            </button>

            <Link to="/" className="cart-page__continue">
              ← கடை தொடர்க
            </Link>
          </div>
        </>
      )}

    </div>
  );
};

export default CartPage;
