import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddForm from '.';
import * as constant from './constant';

test('logic test', async () => {
  const mockOnSubmit = jest.fn();

  render(<AddForm onSubmit={mockOnSubmit} />);

  expect(screen.getByText(constant.FORM_HEADLINE)).toBeInTheDocument();
  userEvent.type(await screen.findByPlaceholderText(constant.INPUT_EMPLOYEE_NAME_PLACEHOLDER), 'John Doe');
  userEvent.type(await screen.findByPlaceholderText(constant.INPUT_EMPLOYEE_EMAIL_PLACEHOLDER), 'jd@email.com');
  userEvent.type(await screen.findByPlaceholderText(constant.INPUT_ROLE_PLACEHOLDER), 'admin');
  userEvent.click(await screen.findByText(constant.BUTTON_TEXT));

  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        [constant.INPUT_EMPLOYEE_NAME]: 'John Doe',
        [constant.INPUT_EMPLOYEE_EMAIL]: 'jd@email.com',
        [constant.INPUT_ROLE]: 'admin',
      })
    );
  });
});
