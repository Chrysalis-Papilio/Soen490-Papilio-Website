import { useContext } from 'react';

import { AuthContext } from '../context/employeeContext';

export const useAuth = (): any => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside the Auth Provider');
  }

  return context;
};
