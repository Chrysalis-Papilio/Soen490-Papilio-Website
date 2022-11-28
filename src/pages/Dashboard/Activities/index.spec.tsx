import { screen, render } from '@testing-library/react';

import ActivityDashboard from '.';
import { FORM_HEADLINE } from './AddForm/constant';
import * as constants from './constant';
import { AuthProvider } from '../../../context/employeeContext';
import * as hooks from '../../../hooks/useEmployee';
import * as API from '../../../api/apiLayer';
import userEvent from '@testing-library/user-event';

jest.mock('firebase/auth');
jest.mock('firebase/app');

describe('Activity dashboard test', () => {
  beforeEach(() => {
    (hooks.useAuth as jest.MockedFunction<typeof hooks.useAuth>) = jest.fn().mockReturnValue({
      employee: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'Admin',
        firebaseId: 'firebase-id',
      },
    });

    (API.getActivites as jest.MockedFunction<typeof API.getActivites>) = jest.fn().mockResolvedValue({
      activities: [],
    });
  });

  afterEach(() => {
    (hooks.useAuth as jest.MockedFunction<typeof hooks.useAuth>).mockClear();
    (API.getActivites as jest.MockedFunction<typeof API.getActivites>).mockClear();
  });

  test('open add employee form test', async () => {
    render(<AuthProvider><ActivityDashboard /></AuthProvider>);

    expect(screen.getByRole('table')).toBeInTheDocument();
    userEvent.click(screen.getByText(constants.ADD_ACTIVITY_BUTTON));

    expect(await screen.findByText(FORM_HEADLINE)).toBeInTheDocument();
  });
});
