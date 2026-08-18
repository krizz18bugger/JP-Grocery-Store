import { ShoppingCart } from 'lucide-react';
import './OrderList.css';

const DUMMY_ORDERS = [
  {
    id: '#ORD-001',
    customer: 'Ramesh Kumar',
    date: '2026-08-14',
    total: 1250,
    status: 'Delivered',
  },
  {
    id: '#ORD-002',
    customer: 'Priya Devi',
    date: '2026-08-15',
    total: 750,
    status: 'Pending',
  },
  {
    id: '#ORD-003',
    customer: 'Karthik M',
    date: '2026-08-16',
    total: 2100,
    status: 'Processing',
  },
];

const STATUS_STYLE = {
  Delivered:  { bg: '#dcfce7', color: '#16a34a' },
  Pending:    { bg: '#fef3c7', color: '#d97706' },
  Processing: { bg: '#eff6ff', color: '#3b82f6' },
  Cancelled:  { bg: '#fee2e2', color: '#dc2626' },
};

const OrderList = () => (
  <div className="ol-page">

    {/* ── Header ── */}
    <div className="ol-header">
      <div className="ol-header__left">
        <ShoppingCart size={22} />
        <h1 className="ol-title">Recent Orders</h1>
      </div>
      <span className="ol-badge-info">WhatsApp orders will appear here once connected</span>
    </div>

    {/* ── Table ── */}
    <div className="ol-table-wrap">
      <table className="ol-table">
        <thead className="ol-thead">
          <tr>
            <th className="ol-th">Order ID</th>
            <th className="ol-th">Customer Name</th>
            <th className="ol-th">Date</th>
            <th className="ol-th">Total Amount</th>
            <th className="ol-th">Status</th>
          </tr>
        </thead>
        <tbody>
          {DUMMY_ORDERS.map((order) => {
            const style = STATUS_STYLE[order.status] || STATUS_STYLE.Pending;
            return (
              <tr key={order.id} className="ol-row">
                <td className="ol-td">
                  <span className="ol-order-id">{order.id}</span>
                </td>
                <td className="ol-td">
                  <div className="ol-customer">
                    <div className="ol-avatar">
                      {order.customer.charAt(0)}
                    </div>
                    {order.customer}
                  </div>
                </td>
                <td className="ol-td ol-date">
                  {new Date(order.date).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </td>
                <td className="ol-td">
                  <span className="ol-amount">₹{order.total.toLocaleString('en-IN')}</span>
                </td>
                <td className="ol-td">
                  <span
                    className="ol-status"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  </div>
);

export default OrderList;
