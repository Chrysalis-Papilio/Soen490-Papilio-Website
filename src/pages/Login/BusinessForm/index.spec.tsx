import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import BusinessForm from '.';
import * as constant from './constant';

describe('business id form test', () => {
  test('successful login on entering a businessId', async () => {
    const mockOnSubmit = jest.fn();

    render(
    <MemoryRouter>
      <BusinessForm onSubmit={mockOnSubmit} />
    </MemoryRouter>
    );

    expect(screen.getByText(constant.FORM_HEADING)).toBeInTheDocument();
    userEvent.type(screen.getByRole('textbox'), 'MyAmazingBillionDollarCompany');

    await act(async () => userEvent.click(await screen.findByText(constant.SUBMIT_BUTTON_TEXT)));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        [constant.INPUT_BUSINESS_ID]: 'MyAmazingBillionDollarCompany',
      })
    ));
  });

  test('error when not providing a businessId', async () => {
    const mockOnSubmit = jest.fn();

    render(
    <MemoryRouter>
      <BusinessForm onSubmit={mockOnSubmit} />
    </MemoryRouter>
    );

    expect(screen.getByText(constant.FORM_HEADING)).toBeInTheDocument();
    await act(async () => userEvent.click(await screen.findByText(constant.SUBMIT_BUTTON_TEXT)));

    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled());
    expect(await screen.findByText(constant.REQUIRED_MESSAGE)).toBeInTheDocument();
  });
});
