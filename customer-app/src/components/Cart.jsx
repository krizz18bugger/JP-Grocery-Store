import { X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const WHATSAPP_NUMBER = '919876543210';

const Cart = () => {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, getCartTotal } =
    useCart();

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    const lines = cartItems.map(
      (item) => `• ${item.name} x${item.quantity} — ₹${item.price * item.quantity}`
    );
    const total = `\n*மொத்தம் (Total): ₹${getCartTotal()}*`;
    const message = `🌿 *JP Integrated Farm — ஆர்டர்*\n\n${lines.join('\n')}${total}\n\nதயவுசெய்து இந்த ஆர்டரை உறுதிப்படுத்தவும்.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isCartOpen ? 'cart-backdrop--visible' : ''}`}
        onClick={closeCart}
      />

      {/* Slide-out Panel */}
      <aside className={`cart-panel ${isCartOpen ? 'cart-panel--open' : ''}`}>

        {/* Header */}
        <div className="cart-panel__header">
          <h2 className="cart-panel__title">🛒 கூடை</h2>
          <button className="cart-panel__close" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-panel__body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon">🛍️</span>
              <p>உங்கள் கூடை காலியாக உள்ளது</p>
              <span>பொருட்களை சேர்க்கவும்</span>
            </div>
          ) : (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__emoji">{item.emoji}</div>
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price">₹{item.price} / item</p>
                    <div className="cart-item__qty">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item__right">
                    <p className="cart-item__subtotal">₹{item.price * item.quantity}</p>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-panel__footer">
            <div className="cart-total">
              <span>மொத்தம்</span>
              <span className="cart-total__amount">₹{getCartTotal()}</span>
            </div>
            <button className="cart-whatsapp-btn" onClick={handleWhatsAppOrder}>
              <MessageCircle size={18} />
              WhatsApp மூலம் ஆர்டர் செய்
            </button>
          </div>
        )}

      </aside>
    </>
  );
};

export default Cart;
