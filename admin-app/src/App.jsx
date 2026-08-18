import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import OrderList from './pages/OrderList';
import './index.css';

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected — AdminLayout handles the redirect if no token */}
          <Route element={<AdminLayout />}>
            <Route path="/"                    element={<Dashboard />} />
            <Route path="/products"            element={<ProductList />} />
            <Route path="/products/new"        element={<ProductEdit />} />
            <Route path="/products/edit/:id"   element={<ProductEdit />} />
            <Route path="/orders"              element={<OrderList />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;
