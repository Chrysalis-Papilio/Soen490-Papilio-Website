import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/Dashboard/Employees';
import ActivityDashboard from './pages/Dashboard/Activities';
import ProfileDashboard from './pages/Dashboard/Profile';
import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/employeeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<LoginPage type='business' />),
    errorElement: (<ErrorPage />),
  },
  {
    path: '/admin',
    element: (<LoginPage type='businessLogic' />),
    errorElement: (<ErrorPage />),
  },
  {
    path: ':businessId/dashboard/',
    element: (<Dashboard />),
    children: [
      {
        element: <div>Home</div>,
      },
      {
        path: 'employees',
        element: <EmployeeDashboard />,
      },
      {
        path: 'activities',
        element: <ActivityDashboard />,
      },
      {
        path: 'ads',
        element: <div>Ad center</div>,
      },
      {
        path: 'profile',
        element: <ProfileDashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: (<LoginPage type='login' />),
    errorElement: (<ErrorPage />),
  },
]);

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
};

export default App;
