import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import SideMenu from '.';
import { AuthProvider } from '../../context/employeeContext';

describe('test side menu', () => {
  it('should display the 5 tabs', () => {
    render(
      <AuthProvider>
        <BrowserRouter><SideMenu /></BrowserRouter>
      </AuthProvider>
    );

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(5);
  });

  it('should logout and go back to home when clicking logout button', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/anything']} initialIndex={0}>
          <Routes>
            <Route path='/anything' element={<SideMenu />} />
            <Route path='/' element={<div>HOME PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getAllByRole('link')).toHaveLength(5);
    userEvent.click(screen.getByText(/Logout/));

    expect(await screen.findByText(/HOME PAGE/)).toBeInTheDocument();
  });
});
