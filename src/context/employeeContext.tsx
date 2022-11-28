import { useState, useCallback, useMemo, createContext } from 'react';

import * as ApiLayer from '../api/apiLayer';

export declare interface IEmployee {
  name: string
  firebaseId: string
  businessId: string
  role: string
}

// @ts-expect-error
const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const initialState: IEmployee = {
  name: '',
  firebaseId: '',
  businessId: '',
  role: '',
};

const AuthProvider = (props: any): JSX.Element => {
  const [employee, setEmployee] = useState(initialState);

  const login = useCallback(
    async (form: IEmployee) => await ApiLayer.login(form).then((data: IEmployee) => setEmployee(data)),
    [setEmployee]
  );
  const register = useCallback(
    async (form: IEmployee) => await ApiLayer.register(form).then((data: IEmployee) => setEmployee(data)),
    [setEmployee]
  );
  const logout = useCallback((callback: Function) => {
    ApiLayer.logout();
    setEmployee(initialState);
    callback();
  }, [setEmployee]);

  const value = useMemo(
    () => ({ employee, login, logout, register }),
    [login, logout, register, employee]
  );

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthProvider, AuthContext };
