import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardContainer from '../../features/DashboardContainer';
import { useAuth } from '../../hooks/useEmployee';

const Dashboard = (): JSX.Element => {
  const { employee, login } = useAuth();
  useEffect(() => {
    const firebaseId = '7IZbSL7ro3R0dlZ9CQfiWa7hxGh2';
    const businessId = 'NewBusiness101';
    const name = 'John Tajsodhflas';

    login({ firebaseId, businessId, name });
  }, []);
  console.log(employee);
  return <DashboardContainer><Outlet /></DashboardContainer>;
};

export default Dashboard;
