import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PATH } from '@/constants/path';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './home';
import { Login } from './login';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to={PATH.HOME} replace={true} />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
