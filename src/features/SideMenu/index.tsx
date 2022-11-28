import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import { useAuth } from '../../hooks/useEmployee';
import TabList, { ITab } from '../TabList';

const tabs: ITab[] = [
  {
    label: 'Home',
    icon: 'home',
    path: '',
  },
  {
    label: 'Activity Manager',
    icon: 'event',
    path: 'activities',
  },
  {
    label: 'Ad Center',
    icon: 'ad',
    path: 'ads',
  },
  {
    label: 'Employees',
    icon: 'employee',
    path: 'employees',
  },
  {
    label: 'Profile',
    icon: 'feed',
    path: 'profile',
  },
];

const SideMenu = (): JSX.Element => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logoutCallback = (): void => {
    navigate('/', {
      replace: true,
    });
  };

  return (
    <div className="w-48 border-r-2 flex flex-col h-screen">
      <div className="pt-4 pb-8 px-3">
        <Logo size="md" hasText/>
      </div>
      <TabList tabs={tabs} type='link' />
      <span className="flex-1"/>
      <div onClick={() => logout(logoutCallback)} className="flex px-3.5 py-3 border-t-2 bg-gray-200 active:bg-gray-400 cursor-pointer">
        <span className="material-symbols-outlined text-base mr-3">
          logout
        </span>
        Logout
      </div>
    </div>
  );
};

export default SideMenu;
