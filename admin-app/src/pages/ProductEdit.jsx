import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Upload, ImageIcon, Save } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import './ProductEdit.css';

const BASE_URL = 'http://localhost:5000/api';

const CATEGORIES = [
  'சரும பராமரிப்பு',
  'கூந்தல் பராமரிப்பு',
  'இயற்கை சமையல் எண்ணெய்',
  'சத்துமாவு',
  'இயற்கை சூப் பொடி',
  'நாட்டுக்கோழி, முட்டை',
  'தேங்காய் எண்ணெய் சோப்புகள்',
];

const INITIAL = {
  name: '',
  price: '',
  category: CATEGORIES[0],
  availability: 'In Stock',
  ingredients: '',
  purpose: '',
  imageUrl: '',
};

const ProductEdit = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { adminToken } = useAdminAuth();

  const [form, setForm] = useState(INITIAL);
  const [pageLoading, setPageLoading] = useState(isEdit);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const authHeader = { Authorization: `Bearer ${adminToken}` };

  // ── Populate form in Edit mode ──
  useEffect(() => {
    if (!isEdit) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products/${id}`);
        const p = res.data;
        setForm({
          name:         p.name         || '',
          price:        p.price        || '',
          category:     p.category     || CATEGORIES[0],
          availability: p.availability || 'In Stock',
          ingredients:  p.ingredients  || '',
          purpose:      p.purpose      || '',
          imageUrl:     p.imageUrl     || '',
        });
      } catch {
        setError('Failed to load product data.');
      } finally {
        setPageLoading(false);
      }
    };
    fetchProduct();
  }, [id, isEdit]);

  // ── Field change ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ── Image upload ──
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploadLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          ...authHeader,
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
    } catch (err) {
      setError(err?.response?.data?.message || 'Image upload failed.');
    } finally {
      setUploadLoading(false);
    }
  };

  // ── Submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitLoading(true);
    try {
      const payload = { ...form, price: Number(form.price) };
      if (isEdit) {
        await axios.put(`${BASE_URL}/products/${id}`, payload, { headers: authHeader });
      } else {
        await axios.post(`${BASE_URL}/products`, payload, { headers: authHeader });
      }
      navigate('/products');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save product.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="pe-state">
        <div className="pe-spinner" />
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="pe-page">

      {/* ── Top Bar ── */}
      <div className="pe-topbar">
        <Link to="/products" className="pe-back">
          <ArrowLeft size={16} strokeWidth={2.5} />
          Back to Products
        </Link>
        <h1 className="pe-title">{isEdit ? 'Edit Product' : 'Create Product'}</h1>
      </div>

      {/* ── Form Card ── */}
      <form className="pe-form" onSubmit={handleSubmit}>

        {error && <p className="pe-error">{error}</p>}

        <div className="pe-grid">

          {/* ── Left column ── */}
          <div className="pe-col">

            <div className="pe-field">
              <label className="pe-label">Product Name *</label>
              <input
                className="pe-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Turmeric Face Pack"
                required
              />
            </div>

            <div className="pe-row-2">
              <div className="pe-field">
                <label className="pe-label">Price (₹) *</label>
                <input
                  className="pe-input"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="250"
                  min="0"
                  required
                />
              </div>
              <div className="pe-field">
                <label className="pe-label">Availability *</label>
                <select
                  className="pe-input pe-select"
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                >
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                  <option>Coming Soon</option>
                </select>
              </div>
            </div>

            <div className="pe-field">
              <label className="pe-label">Category *</label>
              <select
                className="pe-input pe-select"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="pe-field">
              <label className="pe-label">Ingredients</label>
              <input
                className="pe-input"
                type="text"
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                placeholder="e.g. Turmeric, Sandalwood"
              />
            </div>

            <div className="pe-field">
              <label className="pe-label">Purpose / Description</label>
              <textarea
                className="pe-input pe-textarea"
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                placeholder="Describe the product's benefits..."
                rows={4}
              />
            </div>

          </div>

          {/* ── Right column (Image) ── */}
          <div className="pe-col pe-col--right">
            <div className="pe-field">
              <label className="pe-label">Product Image</label>

              {/* Preview */}
              <div className="pe-img-preview">
                {form.imageUrl ? (
                  <img src={form.imageUrl} alt="Preview" className="pe-img-preview__img" />
                ) : (
                  <div className="pe-img-preview__placeholder">
                    <ImageIcon size={32} strokeWidth={1.5} color="var(--text-muted)" />
                    <span>No image selected</span>
                  </div>
                )}
              </div>

              {/* File input */}
              <label className="pe-upload-btn">
                {uploadLoading
                  ? <><div className="pe-spinner pe-spinner--sm" /> Uploading...</>
                  : <><Upload size={15} /> Choose Image</>
                }
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  disabled={uploadLoading}
                  className="pe-file-input"
                />
              </label>

              {/* Manual URL fallback */}
              <input
                className="pe-input pe-input--sm"
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="Or paste image URL here"
              />
            </div>
          </div>

        </div>

        {/* ── Submit ── */}
        <div className="pe-footer">
          <Link to="/products" className="pe-cancel">Cancel</Link>
          <button
            type="submit"
            className="pe-submit"
            disabled={submitLoading || uploadLoading}
          >
            <Save size={16} />
            {submitLoading ? 'Saving...' : 'Save Product'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProductEdit;
