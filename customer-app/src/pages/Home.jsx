import {
  ShoppingBag,
  Leaf,
  Award,
  ShieldCheck,
  Star,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Home.css';

/* ── Data ── */
const CATEGORIES = [
  { id: 1, name: 'சரும பராமரிப்பு',           iconType: 'emoji', iconValue: '🧴' },
  { id: 2, name: 'கூந்தல் பராமரிப்பு',         iconType: 'emoji', iconValue: '💆' },
  { id: 3, name: 'இயற்கை சமையல் எண்ணெய்',     iconType: 'image', iconValue: 'https://placehold.co/100x100/2E7D32/FFF?text=Oil' },
  { id: 4, name: 'சத்துமாவு',                  iconType: 'emoji', iconValue: '🌾' },
  { id: 5, name: 'இயற்கை சூப் பொடி',           iconType: 'image', iconValue: 'https://placehold.co/100x100/F97316/FFF?text=Soup' },
  { id: 6, name: 'நாட்டுக்கோழி, முட்டை',      iconType: 'image', iconValue: 'https://placehold.co/100x100/795548/FFF?text=Egg' },
  { id: 7, name: 'தேங்காய் எண்ணெய் சோப்புகள்', iconType: 'emoji', iconValue: '🧼' },
];

const PRODUCTS = [
  { id: 1, name: 'Turmeric Face Pack', category: 'சரும பராமரிப்பு', price: 250, emoji: '✨' },
  { id: 2, name: 'Herbal Hair Oil', category: 'கூந்தல் பராமரிப்பு', price: 350, emoji: '🌿' },
  { id: 3, name: 'Cold Pressed Groundnut Oil', category: 'இயற்கை சமையல் எண்ணெய்', price: 450, emoji: '🫙' },
  { id: 4, name: 'Multigrain Health Mix', category: 'சத்துமாவு', price: 300, emoji: '🌾' },
];

const TRUST_POINTS = [
  { icon: Leaf, text: '100% இயற்கை', sub: 'Chemical free & organic' },
  { icon: Award, text: 'உயர்ந்த தரம்', sub: 'Quality guaranteed' },
  { icon: ShieldCheck, text: 'கலப்படமற்றது', sub: 'Pure & unadulterated' },
];

const REVIEWS = [
  { id: 1, name: 'ரமேஷ்', rating: 5, text: 'பொருட்கள் மிகவும் தரமாக மற்றும் இயற்கையாக உள்ளது. சிறந்த சேவை!' },
  { id: 2, name: 'கார்த்திக்', rating: 5, text: 'பொருட்கள் மிகவும் தரமாக மற்றும் இயற்கையாக உள்ளது. சிறந்த சேவை!' },
  { id: 3, name: 'கிருஷ்ணமூர்த்தி', rating: 5, text: 'பொருட்கள் மிகவும் தரமாக மற்றும் இயற்கையாக உள்ளது. சிறந்த சேவை!' },
];

/* ── Sub-components ── */
const StarRating = ({ count = 5 }) => (
  <div className="star-rating">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={12} fill="var(--accent)" color="var(--accent)" />
    ))}
  </div>
);

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, openCart } = useCart();
  const inCart = cartItems.some((item) => item.id === product.id);
  const inStock = product.availability !== 'Out of Stock';

  const handleAdd = () => {
    if (!inStock) return;
    addToCart(product);
    openCart();
  };

  return (
    <div className="product-card">
      <div className="product-card__badge">New</div>
      <div className="product-card__img-wrap">
        <span className="product-card__emoji">{product.emoji}</span>
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__meta">
          <StarRating />
          <span className="product-card__price">₹{product.price}</span>
        </div>
        <span style={{
          color: inStock ? 'var(--primary)' : 'red',
          fontSize: '0.875rem',
          fontWeight: 'bold',
        }}>
          {inStock ? 'கையிருப்பில் உள்ளது' : 'கையிருப்பில் இல்லை'}
        </span>
        <button
          className={`product-card__btn ${inCart ? 'product-card__btn--added' : ''}`}
          onClick={handleAdd}
          disabled={!inStock}
          style={!inStock ? { background: '#ccc', cursor: 'not-allowed', pointerEvents: 'none' } : {}}
        >
          {inCart ? '✓ சேர்க்கப்பட்டது' : 'கூடையில் சேர்'}
        </button>
      </div>
    </div>
  );
};

/* ── Page ── */
const Home = () => {
  const { openCart } = useCart();

  return (
    <main className="home">

      {/* ── A. HERO ── */}
      <section className="hero">
        <div className="hero__content">
          <span className="hero__pill">
            <Leaf size={12} />
            சிறந்த ஆன்லைன் இயற்கை அங்காடி
          </span>
          <h1 className="hero__headline">
            உங்களின் ஆரோக்கியமான வாழ்க்கைக்கு இயற்கையான தேர்வுகள்
          </h1>
          <p className="hero__sub">
            எங்கள் பண்ணையிலிருந்து உங்கள் வீட்டிற்கு நேரடியாக
          </p>
          <button className="btn-primary hero__cta" onClick={openCart}>
            <ShoppingBag size={16} />
            பொருட்களை வாங்குங்கள்
          </button>
        </div>
        <div className="hero__visual">
          <div className="hero__circle">
            <span className="hero__circle-emoji">🌿</span>
            <div className="hero__circle-ring" />
          </div>
          <div className="hero__floating-badge hero__floating-badge--1">
            <span>🌱</span> 100% Organic
          </div>
          <div className="hero__floating-badge hero__floating-badge--2">
            <span>🚚</span> Home Delivery
          </div>
        </div>
      </section>

      {/* ── B. CATEGORIES ── */}
      <section className="section categories">
        <div className="section__header">
          <h2 className="section-title">பிரபலமான பிரிவுகள்</h2>
          <button className="section__see-all">
            அனைத்தும் <ChevronRight size={14} />
          </button>
        </div>
        <div className="categories__scroll">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${encodeURIComponent(cat.name)}`}
              className="category-card"
            >
              <div className="category-card__icon">
                {cat.iconType === 'image' ? (
                  <img
                    src={cat.iconValue}
                    alt={cat.name}
                    className="category-card__img"
                  />
                ) : (
                  <span className="category-card__emoji">{cat.iconValue}</span>
                )}
              </div>
              <span className="category-card__label">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── C. TRUST ── */}
      <section className="trust">
        <h2 className="trust__headline">
          உங்களுக்கும் பூமிக்கும் எங்கள் வாக்குறுதி
        </h2>
        <div className="trust__points">
          {TRUST_POINTS.map(({ icon: Icon, text, sub }) => (
            <div key={text} className="trust__point">
              <div className="trust__icon">
                <Icon size={20} strokeWidth={2} />
              </div>
              <span className="trust__label">{text}</span>
              <span className="trust__sub">{sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── D. POPULAR PRODUCTS ── */}
      <section className="section products">
        <div className="section__header">
          <h2 className="section-title">பிரபலமான பொருட்கள்</h2>
          <button className="section__see-all">
            அனைத்தும் <ChevronRight size={14} />
          </button>
        </div>
        <div className="products__grid">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── E. TESTIMONIALS ── */}
      <section className="section testimonials">
        <h2 className="section-title">வாடிக்கையாளர் மதிப்புரைகள்</h2>
        <div className="testimonials__list">
          {REVIEWS.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card__header">
                <div className="review-card__avatar">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="review-card__name">{review.name}</p>
                  <StarRating count={review.rating} />
                </div>
              </div>
              <p className="review-card__text">{review.text}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default Home;
