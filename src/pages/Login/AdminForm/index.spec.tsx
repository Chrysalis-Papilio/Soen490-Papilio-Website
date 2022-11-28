import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import AdminForm from '.';
import * as constant from './constant';

test('logic test', async () => {
  const mockOnSubmit = jest.fn();

  render(
    <MemoryRouter>
      <AdminForm onSubmit={mockOnSubmit} />
    </MemoryRouter>
  );

  expect(screen.getByText(constant.FORM_HEADING)).toBeInTheDocument();
  userEvent.type(await screen.findByPlaceholderText(constant.INPUT_ADMIN_NAME_PLACEHOLDER), 'John Doe');
  userEvent.type(await screen.findByPlaceholderText(constant.INPUT_ADMIN_EMAIL_PLACEHOLDER), 'jd@email.com');
  userEvent.type(await screen.findByPlaceholderText(constant.INPUT_ADMIN_PASSWORD_PLACEHOLDER), 'password');
  userEvent.click(await screen.findByText(constant.SUBMIT_BUTTON_TEXT));

  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        [constant.INPUT_ADMIN_NAME]: 'John Doe',
        [constant.INPUT_ADMIN_EMAIL]: 'jd@email.com',
        [constant.INPUT_ADMIN_PASSWORD]: 'password',
      })
    );
  });
});
