import axios from 'axios';

const full_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const BASE_URL = `${full_url}/api`;


// ── Products ──────────────────────────────────────────────
export const fetchProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data;
};

export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`${BASE_URL}/products?category=${encodeURIComponent(category)}`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};

// ── Auth ──────────────────────────────────────────────────
export const loginUser = async ({ email, password }) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return res.data;
};

export const registerUser = async ({ name, email, password, phone, role }) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, { name, email, password, phone, role });
  return res.data;
};

// ── Reviews ───────────────────────────────────────────────
export const fetchReviewsByProduct = async (productId) => {
  const res = await axios.get(`${BASE_URL}/reviews/${productId}`);
  return res.data;
};

export const submitReview = async ({ productId, rating, comment, token }) => {
  const res = await axios.post(
    `${BASE_URL}/reviews/${productId}`,
    { rating, comment },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
