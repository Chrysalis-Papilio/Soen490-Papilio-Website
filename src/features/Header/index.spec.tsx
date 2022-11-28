import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route, MemoryRouter } from 'react-router-dom';

import Header from '.';

describe('Header tests', () => {
  it('should navigate to login page when login is clicked', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='' element={<Header />} />
          <Route path='/login' element={<p>Login Page</p>} />
        </Routes>
      </MemoryRouter>
    );

    userEvent.click(await screen.findByText('Login'));

    expect(await screen.findByText(/Login Page/)).toBeInTheDocument();
  });

  it('should navigate to admin form page when getting start is clicked', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='' element={<Header />} />
          <Route path='/admin' element={<p>Admin Page</p>} />
        </Routes>
      </MemoryRouter>
    );

    screen.debug();

    userEvent.click(await screen.findByText(/Getting start/));

    expect(await screen.findByText(/Admin Page/)).toBeInTheDocument();
  });
});
