import { useState } from 'react';
import { sendSignInLinkToEmail } from 'firebase/auth';
// import axios from 'axios';

import { auth } from '../../../firebase';
import Table from '../../../features/Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';

const tabs: ITab[] = [
  { label: constant.ALL_EMPLOYEES_LABEL },
  { label: constant.ADMIN_LABEL },
  { label: constant.NORMAL_LABEL },
];

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className='border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white'>
    <span className="material-symbols-outlined">expand_more</span>
    <span className='flex-1'>User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const EmployeeDashboard = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const businessId = 1234; // TODO: REPLACE THIS WITH A GLOBAL VARIABLE

  const onSubmit = async (data: IFormData): Promise<void> => {
    const reqData = {
      firebaseId: '',
      email: data.employeeEmail,
      name: data.employeeName,
      businessId,
      root: false, // True only while creating the business
    };

    await fetch('', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    }).then(async () => {
      await sendSignInLinkToEmail(auth, data.employeeEmail, {
        url: 'https://localhost:3000/email-signin',
      }).then(() => {
        setIsOpen(false);
      });
    });

    // await axios.post(`business/${businessId}/user`, {
    //   firebaseId: '',
    //   email: data.employeeEmail,
    //   name: data.employeeName,
    //   businessId,
    //   root: false, // True only while creating the business
    // }).then(async () => {
    //   await sendSignInLinkToEmail(auth, data.employeeEmail, {
    //     url: 'https://localhost:3000/email-signin',
    //   });
    // }).then(() => {
    //   setIsOpen(false);
    // });
  };

  return (
    <>
      <PageHeader
        header={constant.HEADER}
        subtitle={constant.SUBHEADER}
        rhs={(
          <>
            <SearchBar placeholder={constant.SEARCHBAR_PLACEHOLDER} onClick={() => {}} margin="right"/>
            <Box />
          </>
        )}
      />
      <ListBanner
        tabs={tabs}
        rhs={
          <Button
            text={constant.ADD_EMPLOYEE_BUTTON}
            hasIcon={true}
            icon={IconNames.ADD}
            iconPosition='lhs'
            variant='outline'
            onClick={() => { setIsOpen(!isOpen); }}
            size='sm'
          />
        }
      />
      <div className='p-3'>
        {isOpen ? (<AddForm onSubmit={onSubmit} />) : (<Table />)}
      </div>
    </>
  );
};

export default EmployeeDashboard;
