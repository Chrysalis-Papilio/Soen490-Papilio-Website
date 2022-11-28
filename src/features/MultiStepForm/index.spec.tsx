import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MultiStepForm, { Progress, Step } from '.';
import * as AdminConstant from './AdminForm/constant';
import * as ProfileConstant from './ProfileForm/constant';

const progress: Progress[] = [
  {
    icon: 'feed',
    text: 'Business profile',
  },
  {
    icon: 'admin_panel_settings',
    text: 'Root accout',
  },
  {
    icon: 'done_all',
    text: 'Validation',
  },
];

const steps: Step[] = [
  {
    stepId: 'profile',
    caption: "Let's create your business profile",
    last: false,
  },
  {
    stepId: 'adminAccount',
    caption: "Let's create your main account",
    last: false,
  },
  {
    stepId: 'validation',
    // title: 'Your business is being created',
    caption: "Let's create your business",
    last: true,
  },
];

describe('multi step form test', () => {
  it('should have the business profile as first page and admin form on the second and validation as last page', async () => {
    const mockOnSubmit = jest.fn();
    render(
      <MemoryRouter initialEntries={[{ state: { businessId: 'business1' } }]}>
        <MultiStepForm steps={steps} progress={progress} onSubmit={mockOnSubmit}/>
      </MemoryRouter>
    );

    expect(await screen.findByText(ProfileConstant.FORM_TITLE)).toBeInTheDocument();
    userEvent.click(await screen.findByText('Next'));
    expect(await screen.findByText(AdminConstant.FORM_TITLE)).toBeInTheDocument();
    userEvent.click(await screen.findByText('Next'));
    expect(await screen.findByText(/Finish Yeah!!!/)).toBeInTheDocument();
  });

  it('should save the data and display them on back', async () => {
    const mockOnSubmit = jest.fn();
    render(
      <MemoryRouter initialEntries={[{ state: { businessId: 'business1' } }]}>
        <MultiStepForm steps={steps} progress={progress} onSubmit={mockOnSubmit} />
      </MemoryRouter>);

    const name = 'My Awesome Business';
    userEvent.type(await screen.findByRole('textbox', { name: 'Business name' }), name);
    userEvent.click(await screen.findByText('Next'));
    userEvent.click(await screen.findByText('Back'));

    expect(await screen.findByDisplayValue(name)).toBeInTheDocument();
  });
});
