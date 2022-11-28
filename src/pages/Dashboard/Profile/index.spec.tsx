import userEvent from '@testing-library/user-event';
import { screen, render, act } from '@testing-library/react';
import ProfileDashboard from '.';
import { IconNames } from '../../../components/Icon';
import * as API from '../../../api/apiLayer';

jest.mock('../../../api/apiLayer', () => ({
  getProfile: jest.fn(),
}));

describe('dashboard profile test', () => {
  beforeEach(() => {
    (API.getProfile as jest.MockedFunction<typeof API.getProfile>).mockResolvedValue(new Response());
  });

  afterEach(() => {
    (API.getProfile as jest.MockedFunction<typeof API.getProfile>).mockClear();
  });

  it('should display header and have 7 pieces of information', () => {
    render(<ProfileDashboard />);

    expect(screen.getByText(/Business profile/)).toBeInTheDocument();

    const fields = screen.getAllByTestId('field');

    expect(fields).toHaveLength(7);
  });

  it('should show inputs when button click', async () => {
    render(<ProfileDashboard />);

    userEvent.click((await screen.findAllByText(IconNames.EDIT_SQUARE))[0]);

    expect(await screen.findAllByRole('textbox')).toHaveLength(1);
  });

  it('should save new value when save button clicked', async () => {
    render(<ProfileDashboard />);

    userEvent.click(screen.getAllByText(IconNames.EDIT_SQUARE)[0]);
    expect(await screen.findAllByRole('textbox')).toHaveLength(1);
    expect(await screen.findAllByTestId('field')).toHaveLength(6);
    await act(async () => userEvent.click(await screen.findByText(IconNames.SAVE)));

    expect(await screen.findAllByTestId('field')).toHaveLength(7);
  });
});
