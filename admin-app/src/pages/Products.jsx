import { Package } from 'lucide-react';

const Products = () => (
  <div style={{ padding: '32px 28px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <Package size={22} />
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.4px' }}>Products</h1>
    </div>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
      Product management coming soon — CRUD table will be built here.
    </p>
  </div>
);

export default Products;
