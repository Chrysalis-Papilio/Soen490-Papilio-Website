/* eslint-disable no-import-assign */
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as auth from 'firebase/auth';

import LoginPage from '.';
import * as businessConstant from './BusinessForm/constant';
import * as ProfileConstant from '../../features/MultiStepForm/ProfileForm/constant';
import * as AdminConstant from '../../features/MultiStepForm/AdminForm/constant';
import * as LoginConstant from './LoginForm/constant';
import { AuthProvider } from '../../context/employeeContext';
import * as API from '../../api/apiLayer';

jest.mock('firebase/auth');
jest.mock('../../api/apiLayer', () => ({
  getBusiness: jest.fn(),
  register: jest.fn(),
  addBusiness: jest.fn(),
  login: jest.fn(),
}));

describe('login logic test', () => {
  afterEach(() => {
    (API.getBusiness as jest.MockedFunction<typeof API.getBusiness>).mockClear();
    (API.addBusiness as jest.MockedFunction<typeof API.addBusiness>).mockClear();
    (API.register as jest.MockedFunction<typeof API.register>).mockClear();
  });

  test('login page business successful business creation', async () => {
    // @ts-expect-error
    API.getBusiness.mockReturnValue(Promise.resolve({
      status: 200,
    }));

    render(
      <AuthProvider>
        <MemoryRouter>
          <Routes>
            <Route path='' element={<LoginPage type='business' />} />
            <Route path='admin' element={<div>ADMIN PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(businessConstant.FORM_HEADING)).toBeInTheDocument();
    userEvent.type(screen.getByRole('textbox'), 'businessId');
    await act(async () => userEvent.click(await screen.findByText(businessConstant.SUBMIT_BUTTON_TEXT)));

    expect(await screen.findByText(/ADMIN PAGE/)).toBeInTheDocument();
    expect(API.getBusiness).toHaveBeenCalledWith('businessId');
  });

  test('login page business unsuccessful business creation', async () => {
    // @ts-expect-error
    API.getBusiness.mockReturnValue(Promise.resolve({
      status: 400,
    }));

    render(
      <AuthProvider>
        <MemoryRouter>
          <Routes>
            <Route path='' element={<LoginPage type='business' />} />
            <Route path='admin' element={<div>ADMIN PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    userEvent.type(screen.getByRole('textbox'), 'businessId');
    await act(async () => userEvent.click(await screen.findByText(businessConstant.SUBMIT_BUTTON_TEXT)));

    expect(screen.queryByText(/ADMIN PAGE/)).not.toBeInTheDocument();
    expect(await screen.findByText(businessConstant.FORM_HEADING)).toBeInTheDocument();
    expect(API.getBusiness).toHaveBeenCalledWith('businessId');
  });

  test('login page business logic successful business creation', async () => {
    // @ts-expect-error
    (API.addBusiness as jest.MockedFunction<typeof API.addBusiness>).mockResolvedValueOnce({
      status: 200,
    });
    (API.register as jest.MockedFunction<typeof API.register>).mockResolvedValue({
      name: 'John',
      role: 'Admin',
      firebaseId: 'firebase-id',
    });
    // @ts-expect-error
    auth.createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        uid: 'firebase-id',
      },
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[{ state: { businessId: '1234' } }]}>
          <Routes>
            <Route path="" element={<LoginPage type='businessLogic' />} />
            <Route path="/1234/dashboard" element={<div>DASHBOARD PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByRole('heading', { name: ProfileConstant.FORM_TITLE })).toBeInTheDocument();
    await act(async () => userEvent.click(screen.getByText(/Next/)));
    expect(await screen.findByRole('heading', { name: AdminConstant.FORM_TITLE })).toBeInTheDocument();
    await act(async () => userEvent.click(await screen.findByText(/Next/)));
    expect(await screen.findByText(/submit/)).toBeInTheDocument();
    await act(async () => userEvent.click(await screen.findByText(/submit/)));
    expect(await screen.findByText(/DASHBOARD PAGE/)).toBeInTheDocument();
    await waitFor(() => {
      expect(API.register).toHaveBeenCalled();
      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
    });
  });

  test('login page business logic unsuccessful business creation', async () => {
    // @ts-expect-error
    (API.addBusiness as jest.MockedFunction<typeof API.addBusiness>).mockResolvedValueOnce({
      status: 400,
    });
    // @ts-expect-error
    auth.createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        uid: 'firebase-id',
      },
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[{ state: { businessId: '1234' } }]}>
          <Routes>
            <Route path="" element={<LoginPage type='businessLogic' />} />
            <Route path="/1234/dashboard" element={<div>DASHBOARD PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    await act(async () => userEvent.click(await screen.findByText(/Next/)));
    await act(async () => userEvent.click(await screen.findByText(/Next/)));
    await act(async () => userEvent.click(await screen.findByText(/submit/)));
    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(screen.queryByText(/DASHBOARD PAGE/)).not.toBeInTheDocument();
    expect(await screen.findByText(/Yeah/)).toBeInTheDocument();
    expect(API.register).not.toHaveBeenCalled();
  });

  test('login page business logic unsuccessful business creation on firebase error', async () => {
    // @ts-expect-error
    (API.addBusiness as jest.MockedFunction<typeof API.addBusiness>).mockResolvedValueOnce({
      status: 400,
    });
    // @ts-expect-error
    auth.createUserWithEmailAndPassword.mockRejectedValue(new Error('an error occur'));

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[{ state: { businessId: '1234' } }]}>
          <Routes>
            <Route path="" element={<LoginPage type='businessLogic' />} />
            <Route path="/1234/dashboard" element={<div>DASHBOARD PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    await act(async () => userEvent.click(screen.getByText(/Next/)));
    await act(async () => userEvent.click(await screen.findByText(/Next/)));
    await act(async () => userEvent.click(await screen.findByText(/submit/)));

    expect(screen.queryByText(/DASHBOARD PAGE/)).not.toBeInTheDocument();
    expect(await screen.findByText(/Yeah/)).toBeInTheDocument();
    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(API.addBusiness).not.toHaveBeenCalled();
    expect(API.register).not.toHaveBeenCalled();
  });

  test('login page employee login logic successful when entering correct information', async () => {
    (API.login as jest.MockedFunction<typeof API.login>).mockResolvedValue({
      name: '',
      firebaseId: 'firebase-id',
      businessId: '1234',
      role: 'admin',
    });

    (auth.signInWithEmailAndPassword as jest.MockedFunction<typeof auth.signInWithEmailAndPassword>)
      .mockResolvedValue({
        // @ts-expect-error
        user: {
          uid: 'firebase-id',
        },
      });

    render(
      <AuthProvider>
        <MemoryRouter>
          <Routes>
            <Route path="" element={<LoginPage type='login' />} />
            <Route path="/1234/dashboard" element={<div>DASHBOARD PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    userEvent.type(await screen.findByPlaceholderText(LoginConstant.INPUT_EMAIL_PLACEHOLDER), 'jd@email.com');
    userEvent.type(await screen.findByPlaceholderText(LoginConstant.INPUT_PASSWORD_PLACEHOLDER), 'password');
    userEvent.type(await screen.findByPlaceholderText(LoginConstant.INPUT_BUSINESS_ID_PLACEHOLDER), '1234');
    await act(async () => userEvent.click(await screen.findByText(/Login$/m)));

    expect(await screen.findByText(/DASHBOARD PAGE/)).toBeInTheDocument();
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(API.login).toHaveBeenCalledWith(expect.objectContaining({
      firebaseId: 'firebase-id',
      businessId: '1234',
    }));
  });
});
