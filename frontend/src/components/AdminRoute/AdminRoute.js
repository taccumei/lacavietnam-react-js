import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import NotFound from '../NotFound/NotFound';
import AuthRoute from '../AuthRoute/AuthRoute';

function AdminRoute({children}) {
  const { user } = useAuth();

  return (
    user.isAdmin ? children :
      <NotFound
        linkRoute="/dashboard"
        linkText="Go to Dashboard"
        messages="You dont have to access this page"
        />
  )
}

const AdminRouteExport = ({ children }) => (
  <AuthRoute>
    <AdminRoute>{children}</AdminRoute>
  </AuthRoute>
)

export default AdminRouteExport;