import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAdminAuth } from '../context/AdminAuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { adminToken } = useAdminAuth();

  if (!adminToken) return <Navigate to="/login" replace />;

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
