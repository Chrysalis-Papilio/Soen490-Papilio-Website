/* eslint-disable no-import-assign */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as auth from 'firebase/auth';

import EmployeeDashboard from '.';
import * as constant from './constant';
import * as formConstant from './AddForm/constant';
import { FORM_HEADLINE } from './AddForm/constant';
import { AuthProvider } from '../../../context/employeeContext';
import * as API from '../../../api/apiLayer';
import * as hooks from '../../../hooks/useEmployee';

jest.mock('firebase/auth');
jest.mock('firebase/app');

describe('logic test', () => {
  beforeEach(() => {
    // @ts-expect-error
    hooks.useAuth = jest.fn().mockReturnValue({
      employee: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'Admin',
        firebaseId: 'firebase-id',
      },
    });
    // @ts-expect-error
    API.getEmployees = jest.fn().mockResolvedValue({
      employees: [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'jdoe@email.com',
          role: 'Admin',
        },
      ],
    });
  });

  afterEach(() => {
    (API.getEmployees as jest.MockedFunction<typeof API.getEmployees>).mockClear();
    (hooks.useAuth as jest.MockedFunction<typeof hooks.useAuth>).mockClear();
  });

  test('open add employee form test', async () => {
    render(<AuthProvider><EmployeeDashboard /></AuthProvider>);

    expect(screen.getByRole('table')).toBeInTheDocument();
    userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));

    expect(await screen.findByText(FORM_HEADLINE)).toBeInTheDocument();
  });

  test('when getEmployee throw error returns empty list of employees', async () => {
    (API.getEmployees as jest.MockedFunction<typeof API.getEmployees>).mockReturnValueOnce(Promise.reject(new Error('error', { cause: 1 })));

    render(<AuthProvider><EmployeeDashboard /></AuthProvider>);

    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.queryByText(/jdoe@email.com/)).not.toBeInTheDocument();
  });

  test('add employee form submit form after submit button clicked', async () => {
    // @ts-expect-error
    API.addEmployee = jest.fn().mockResolvedValue({});

    // @ts-expect-error
    auth.sendSignInLinkToEmail.mockResolvedValue();

    render(<AuthProvider><EmployeeDashboard /></AuthProvider>);

    userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));
    userEvent.type(await screen.findByRole('textbox', { name: formConstant.INPUT_EMPLOYEE_FIRST_NAME_LABEL }), 'John');
    userEvent.type(await screen.findByRole('textbox', { name: formConstant.INPUT_EMPLOYEE_LAST_NAME_LABEL }), 'Doe');
    userEvent.type(await screen.findByRole('textbox', { name: formConstant.INPUT_EMPLOYEE_EMAIL_LABEL }), 'jd@email.com');
    userEvent.type(await screen.findByRole('textbox', { name: formConstant.INPUT_ROLE_LABEL }), 'Admin');

    const button = (await screen.findAllByText(formConstant.BUTTON_TEXT)).at(1);
    userEvent.click(button as Element);

    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(API.addEmployee).toHaveBeenCalledWith(expect.stringContaining(''), expect.objectContaining({
      email: 'jd@email.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'Admin',
    }));
  });
});
