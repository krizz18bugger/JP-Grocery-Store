import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star, Minus, Plus, CheckCircle } from 'lucide-react';
import { fetchProductById, fetchReviewsByProduct } from '../api/api.js';
import { useCart } from '../context/CartContext';
import AddReviewForm from '../components/AddReviewForm.jsx';
import './ProductDetails.css';

const StarRating = ({ value = 0, size = 14 }) => (
  <div className="pd-stars">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={size}
        fill={s <= value ? 'var(--accent)' : 'transparent'}
        color={s <= value ? 'var(--accent)' : 'var(--stroke)'}
        strokeWidth={2}
      />
    ))}
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, openCart } = useCart();

  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);

  // ── Fetch product ──
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });

  // ── Fetch reviews ──
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => fetchReviewsByProduct(id),
    enabled: !!id,
  });

  const inStock = product?.availability === 'In Stock';
  const inCart = cartItems.some((item) => item.id === product?._id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ ...product, id: product._id });
    }
    setToast(true);
    setTimeout(() => setToast(false), 2200);
    openCart();
  };

  // ── Loading ──
  if (isLoading) return (
    <div className="pd-state">
      <div className="pd-spinner" />
    </div>
  );

  // ── Error ──
  if (isError || !product) return (
    <div className="pd-state">
      <p>பொருளை ஏற்ற இயலவில்லை.</p>
      <button className="pd-back-link" onClick={() => navigate(-1)}>← திரும்பு</button>
    </div>
  );

  const avgRating = reviews.length
    ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
    : 0;

  return (
    <div className="pd-page">

      {/* ── Sticky Top Bar ── */}
      <div className="pd-topbar">
        <button className="pd-topbar__back" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        <span className="pd-topbar__title">பொருள் விவரம்</span>
        <div className="pd-topbar__spacer" />
      </div>

      {/* ── Hero Image ── */}
      <div className="pd-hero">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="pd-hero__img" />
        ) : (
          <div className="pd-hero__placeholder">🌿</div>
        )}
      </div>

      {/* ── Product Info ── */}
      <div className="pd-body">

        {/* Category + name + price */}
        <div className="pd-header">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>
          <div className="pd-meta-row">
            <span className="pd-price">₹{product.price}</span>
            <span className={`pd-stock ${inStock ? 'pd-stock--in' : 'pd-stock--out'}`}>
              {inStock ? (
                <><CheckCircle size={13} /> கையிருப்பில் உள்ளது</>
              ) : (
                'கையிருப்பில் இல்லை'
              )}
            </span>
          </div>
          {reviews.length > 0 && (
            <div className="pd-rating-row">
              <StarRating value={avgRating} />
              <span className="pd-rating-count">({reviews.length} மதிப்புரைகள்)</span>
            </div>
          )}
        </div>

        {/* ── Quantity + Add to Cart ── */}
        <div className="pd-action">
          <div className="pd-qty">
            <span className="pd-qty__label">எண்ணிக்கை</span>
            <div className="pd-qty__controls">
              <button
                className="pd-qty__btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="pd-qty__value">{qty}</span>
              <button
                className="pd-qty__btn"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            className={`pd-add-btn ${inCart ? 'pd-add-btn--added' : ''}`}
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            {inCart ? '✓ கூடையில் சேர்க்கப்பட்டது!' : 'கூடையில் சேர்'}
          </button>
        </div>

        {/* ── Description ── */}
        {(product.purpose || product.ingredients) && (
          <div className="pd-section">
            <h2 className="pd-section__title">பொருள் விளக்கம்</h2>
            {product.purpose && <p className="pd-description">{product.purpose}</p>}
            {product.ingredients && (
              <div className="pd-ingredients">
                <span className="pd-ingredients__label">பொருட்கள்:</span>
                <span>{product.ingredients}</span>
              </div>
            )}
          </div>
        )}

        {/* ── Reviews ── */}
        <div className="pd-section">
          <h2 className="pd-section__title">
            வாடிக்கையாளர் மதிப்புரைகள்
            {reviews.length > 0 && <span className="pd-section__count">{reviews.length}</span>}
          </h2>

          {reviews.length === 0 ? (
            <p className="pd-no-reviews">இன்னும் மதிப்புரைகள் எதுவும் இல்லை.</p>
          ) : (
            <ul className="pd-reviews">
              {reviews.map((r) => (
                <li key={r._id} className="pd-review">
                  <div className="pd-review__header">
                    <div className="pd-review__avatar">
                      {r.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="pd-review__name">{r.user?.name || 'பயனர்'}</p>
                      <StarRating value={r.rating} size={12} />
                    </div>
                  </div>
                  <p className="pd-review__comment">{r.comment}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Add Review Form */}
          <AddReviewForm productId={id} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
