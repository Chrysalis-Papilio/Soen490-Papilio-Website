import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import LoginForm from '.';
import * as constant from './constant';


test('logic test', async () => {
  const mockonSubmit = jest.fn();

  render(
    <MemoryRouter>
      <LoginForm onSubmit={mockonSubmit} />
    </MemoryRouter>
  );

  expect(screen.getByText(constant.FORM_HEADING)).toBeInTheDocument();

  userEvent.type(await screen.findByPlaceholderText(constant.INPUT_EMAIL_PLACEHOLDER), 'login@email.com');
  userEvent.type(await screen.findByPlaceholderText(constant.INPUT_PASSWORD_PLACEHOLDER), 'password');
  userEvent.click(await screen.findByText(constant.SUBMIT_BUTTON_TEXT));

  await waitFor(() => {
    expect(mockonSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        [constant.INPUT_EMAIL]: 'login@email.com',
        [constant.INPUT_PASSWORD]: 'password',
      })
    );
  });
});
