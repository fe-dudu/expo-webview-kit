import { PATH } from '@/constants/path';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router';
import { Home } from './home';
import { protectedLoader } from './loader';
import { Login } from './login';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    loader: protectedLoader,
    element: <Home />,
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
