import { ComponentMeta, ComponentStory } from '@storybook/react';

import Table, { TableInterface } from '.';

export default {
  title: 'Features/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args: TableInterface) => (
  <div className='h-screen'>
    <Table {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  headContent: [
    { value: 'Employee name' },
    { value: 'Email' },
    { value: 'Role', center: true },
  ],
  bodyContent: [
    [
      { value: 'John Doe' },
      { value: 'j.doe@email.com' },
      { value: 'Admin', center: true },
    ],
    [
      { value: 'John Doe' },
      { value: 'j.doe@email.com' },
      { value: 'Admin', center: true },
    ],
    [
      { value: 'John Doe' },
      { value: 'j.doe@email.com' },
      { value: 'Admin', center: true },
    ],
  ],
};

export const Events = Template.bind({});
Events.args = {
  headContent: [
    { value: 'Event name' },
    { value: 'Created', center: true },
    { value: 'Launched', center: true },
    { value: 'Closed', center: true },
    { value: 'State', center: true },
  ],
  bodyContent: [
    [
      { value: 'Special Friday Night Event' },
      { value: '10-10-2022', center: true },
      { value: '10-10-2022', center: true },
      { value: '10-10-2022', center: true },
      { value: 'Active', center: true },
    ],
    [
      { value: "Ladies' Night" },
      { value: '10-10-2022', center: true },
      { value: '10-10-2022', center: true },
      { value: '10-10-2022', center: true },
      { value: 'Draft', center: true },
    ],
    [
      { value: 'Mystery Thursday' },
      { value: '10-10-2022', center: true },
      { value: '10-10-2022', center: true },
      { value: '10-10-2022', center: true },
      { value: 'Closed', center: true },
    ],
  ],
};
