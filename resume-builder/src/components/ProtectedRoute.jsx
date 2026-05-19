import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import LoadingSpinner from './LoadingSpinner'

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <LoadingSpinner color="black" />
      </div>
    );
  }

  return isAuth
    ? children
    : <Navigate to={`/login?redirect=${location.pathname}`} replace />;
};

export default ProtectedRoute
