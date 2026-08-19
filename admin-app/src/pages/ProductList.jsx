import { BASE_URL } from '../api/api.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Trash2, Plus, Package } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import './ProductList.css';


const ProductList = () => {
  const { adminToken } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        setError('Failed to load products. Is the backend running?');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Delete failed. Try again.');
    }
  };

  return (
    <div className="pl-page">

      {/* ── Header ── */}
      <div className="pl-header">
        <div className="pl-header__left">
          <Package size={22} />
          <h1 className="pl-title">Products</h1>
        </div>
        <Link to="/products/new" className="pl-add-btn">
          <Plus size={16} strokeWidth={2.5} />
          Add New Product
        </Link>
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="pl-state">
          <div className="pl-spinner" />
          <p>Loading products...</p>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="pl-error">{error}</div>
      )}

      {/* ── Empty ── */}
      {!isLoading && !error && products.length === 0 && (
        <div className="pl-state">
          <Package size={40} strokeWidth={1.5} color="var(--text-muted)" />
          <p>No products found. Add your first product.</p>
          <Link to="/products/new" className="pl-add-btn">
            <Plus size={14} /> Add Product
          </Link>
        </div>
      )}

      {/* ── Table ── */}
      {!isLoading && !error && products.length > 0 && (
        <div className="pl-table-wrap">
          <p className="pl-count">{products.length} product{products.length !== 1 ? 's' : ''}</p>
          <table className="pl-table">
            <thead className="pl-thead">
              <tr>
                <th className="pl-th">Image</th>
                <th className="pl-th">Name</th>
                <th className="pl-th">Category</th>
                <th className="pl-th">Price</th>
                <th className="pl-th">Stock</th>
                <th className="pl-th pl-th--center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="pl-row">
                  {/* Image */}
                  <td className="pl-td">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="pl-thumb"
                      />
                    ) : (
                      <div className="pl-thumb-placeholder">🌿</div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="pl-td">
                    <p className="pl-product-name">{product.name}</p>
                  </td>

                  {/* Category */}
                  <td className="pl-td">
                    <span className="pl-category-badge">{product.category}</span>
                  </td>

                  {/* Price */}
                  <td className="pl-td">
                    <span className="pl-price">₹{product.price}</span>
                  </td>

                  {/* Stock */}
                  <td className="pl-td">
                    <span className={`pl-stock ${
                      product.availability === 'In Stock'    ? 'pl-stock--in'   :
                      product.availability === 'Coming Soon' ? 'pl-stock--soon' :
                      'pl-stock--out'
                    }`}>
                      {product.availability}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="pl-td pl-td--center">
                    <div className="pl-actions">
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="pl-action-btn pl-action-btn--edit"
                        title="Edit product"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        className="pl-action-btn pl-action-btn--delete"
                        onClick={() => handleDelete(product._id)}
                        title="Delete product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default ProductList;
