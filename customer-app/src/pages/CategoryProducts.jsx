import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ShoppingBag, Star } from 'lucide-react';
import { fetchProductsByCategory } from '../api/api.js';
import { useCart } from '../context/CartContext';
import './CategoryProducts.css';

const StarRating = ({ count = 5 }) => (
  <div className="cat-star-rating">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={11} fill="var(--accent)" color="var(--accent)" />
    ))}
  </div>
);

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const decoded = decodeURIComponent(categoryName);
  const { addToCart, cartItems, openCart } = useCart();

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products', decoded],
    queryFn: () => fetchProductsByCategory(decoded),
  });

  const handleAdd = (product) => {
    addToCart(product);
    openCart();
  };

  return (
    <div className="cat-page">

      {/* ── Top bar ── */}
      <div className="cat-topbar">
        <Link to="/" className="cat-topbar__back" aria-label="Go back">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </Link>
        <h1 className="cat-topbar__title">{decoded}</h1>
      </div>

      {/* ── States ── */}
      {isLoading && (
        <div className="cat-state">
          <div className="cat-spinner" />
          <p>ஏற்றுகிறது...</p>
        </div>
      )}

      {isError && (
        <div className="cat-state cat-state--error">
          <span>⚠️</span>
          <p>தரவை ஏற்ற இயலவில்லை. மீண்டும் முயற்சிக்கவும்.</p>
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <div className="cat-state">
          <span className="cat-state__icon">🌿</span>
          <p className="cat-state__msg">இந்தப் பிரிவில் தற்சமயம் பொருட்கள் எதுவும் இல்லை</p>
          <Link to="/" className="cat-state__link">← முகப்புக்கு திரும்பு</Link>
        </div>
      )}

      {/* ── Grid ── */}
      {!isLoading && !isError && products.length > 0 && (
        <>
          <p className="cat-count">{products.length} பொருட்கள்</p>
          <div className="cat-grid">
            {products.map((product) => {
              const inCart = cartItems.some((item) => item.id === (product._id || product.id));
              const productId = product._id || product.id;
              const inStock = product.availability !== 'Out of Stock';

              return (
                  <div key={productId} className="cat-card">
                  <Link to={`/product/${productId}`} className="cat-card__link">
                    <div className="cat-card__img-wrap">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="cat-card__img"
                        />
                      ) : (
                        <div className="cat-card__img-placeholder">🌿</div>
                      )}
                    </div>
                    <div className="cat-card__info">
                      <p className="cat-card__name">{product.name}</p>
                      <StarRating />
                      <p className="cat-card__price">₹{product.price}</p>
                      <span style={{
                        color: inStock ? 'var(--primary)' : 'red',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}>
                        {inStock ? 'கையிருப்பில் உள்ளது' : 'கையிருப்பில் இல்லை'}
                      </span>
                    </div>
                  </Link>
                  <button
                    className={`cat-card__btn ${inCart ? 'cat-card__btn--added' : ''}`}
                    onClick={() => handleAdd({ ...product, id: productId })}
                    disabled={!inStock}
                    style={!inStock ? { background: '#ccc', cursor: 'not-allowed', pointerEvents: 'none' } : {}}
                  >
                    <ShoppingBag size={13} />
                    {inCart ? '✓ சேர்க்கப்பட்டது' : 'கூடையில் சேர்'}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
};

export default CategoryProducts;
