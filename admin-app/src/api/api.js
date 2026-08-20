import { URL } from 'url';
const full_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const BASE_URL = new URL('/api', full_url).href;
