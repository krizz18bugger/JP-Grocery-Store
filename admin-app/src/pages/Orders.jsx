import { ShoppingCart } from 'lucide-react';

const Orders = () => (
  <div style={{ padding: '32px 28px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <ShoppingCart size={22} />
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.4px' }}>Orders</h1>
    </div>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
      Order management coming soon — live order tracking will be built here.
    </p>
  </div>
);

export default Orders;
