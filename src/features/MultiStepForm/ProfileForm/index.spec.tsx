import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProfilForm, { IFormData } from '.';

const initialState: IFormData = {
  businessName: '',
  addressLineOne: '',
  addressLineTwo: '',
  postalCode: '',
  city: '',
  country: '',
  province: '',
};

describe('profile form test', () => {
  it('should have 7 inputs', async () => {
    const mockOnSubmit = jest.fn();
    render(<ProfilForm initialState={initialState} onSubmit={mockOnSubmit}/>);

    const inputs = screen.getAllByRole('textbox');

    expect(inputs.length).toBe(7);
  });

  it('should accept inputs and send data on submit', async () => {
    const mockOnSubmit = jest.fn();
    render(<ProfilForm initialState={initialState} onSubmit={mockOnSubmit} />);

    userEvent.type(await screen.findByRole('textbox', { name: /Business name/i }), 'My Awesome Business');
    userEvent.type(await screen.findByRole('textbox', { name: /Address/i }), '1234 Awesome St');
    userEvent.type(await screen.findByRole('textbox', { name: /Postal Code/i }), 'H3B 5G1');
    userEvent.type(await screen.findByRole('textbox', { name: /City/i }), 'Montreal');
    userEvent.type(await screen.findByRole('textbox', { name: /Province/i }), 'QC');
    userEvent.type(await screen.findByRole('textbox', { name: /Country/i }), 'Canada');
    userEvent.click(await screen.findByText('Next'));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        businessName: 'My Awesome Business',
        addressLineOne: '1234 Awesome St',
        addressLineTwo: '',
        postalCode: 'H3B 5G1',
        city: 'Montreal',
        country: 'Canada',
        province: 'QC',
      }
    ));
  });
});
