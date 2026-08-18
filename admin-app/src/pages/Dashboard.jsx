import { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import axios from 'axios';
import './Dashboard.css';

const BASE_URL = 'http://localhost:5000/api';

const KPI_BASE = [
  {
    key: 'products',
    label: 'Total Products',
    value: null,        // filled after fetch
    icon: Package,
    color: '#2E7D32',
    bg: '#E8F5E9',
    trend: null,
  },
  {
    key: 'orders',
    label: 'Total Orders',
    value: 12,
    icon: ShoppingCart,
    color: '#F97316',
    bg: '#FFF7ED',
    trend: '+3 this week',
  },
  {
    key: 'customers',
    label: 'Active Customers',
    value: 48,
    icon: Users,
    color: '#3B82F6',
    bg: '#EFF6FF',
    trend: '+6 this month',
  },
];

const Dashboard = () => {
  const [productCount, setProductCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/products`)
      .then((res) => setProductCount(res.data.length))
      .catch(() => setProductCount('—'))
      .finally(() => setLoading(false));
  }, []);

  const kpis = KPI_BASE.map((k) =>
    k.key === 'products' ? { ...k, value: loading ? '…' : productCount } : k
  );

  return (
    <div className="dash-page">

      {/* ── Header ── */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard Overview</h1>
          <p className="dash-sub">Welcome back! Here's what's happening with JP Integrated Farm.</p>
        </div>
        <div className="dash-date">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* ── KPI Grid ── */}
      <div className="dash-kpi-grid">
        {kpis.map(({ key, label, value, icon: Icon, color, bg, trend }) => (
          <div key={key} className="kpi-card">
            <div className="kpi-card__top">
              <div className="kpi-card__icon" style={{ background: bg, color }}>
                <Icon size={22} strokeWidth={2} />
              </div>
              <ArrowUpRight size={16} className="kpi-card__arrow" />
            </div>
            <p className="kpi-card__value">{value ?? '—'}</p>
            <p className="kpi-card__label">{label}</p>
            {trend && <p className="kpi-card__trend" style={{ color }}>{trend}</p>}
          </div>
        ))}
      </div>

      {/* ── Quick Links ── */}
      <div className="dash-section">
        <h2 className="dash-section__title">Quick Actions</h2>
        <div className="dash-quick">
          <a href="/products/new" className="dash-quick-card">
            <Package size={20} color="var(--primary)" />
            <span>Add New Product</span>
          </a>
          <a href="/products" className="dash-quick-card">
            <TrendingUp size={20} color="#F97316" />
            <span>View Inventory</span>
          </a>
          <a href="/orders" className="dash-quick-card">
            <ShoppingCart size={20} color="#3B82F6" />
            <span>View Orders</span>
          </a>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
