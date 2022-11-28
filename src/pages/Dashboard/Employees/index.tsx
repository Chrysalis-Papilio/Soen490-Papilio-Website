import { useEffect, useState } from 'react';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { useParams } from 'react-router-dom';

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
import { addEmployee, getEmployees } from '../../../api/apiLayer';
import { IEmployeeData } from '../../../interfaces';
import { useAuth } from '../../../hooks/useEmployee';

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
  const { employee } = useAuth();
  const { businessId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: IFormData): Promise<void> => {
    const reqData: IEmployeeData = {
      firebaseId: '',
      email: data.employeeEmail,
      firstName: data.employeeFirstName,
      lastName: data.employeeLastName,
      businessId: (businessId ?? ''),
      role: data.role,
      root: false, // True only while creating the business
    };

    await addEmployee((businessId ?? ''), reqData).then(async () => {
      await sendSignInLinkToEmail(auth, data.employeeEmail, {
        url: 'https://localhost:3000/email-signin',
      }).then(() => {
        setIsOpen(false);
      });
    });
  };

  const ActionList = (): JSX.Element => {
    if (employee.role !== 'Admin') { return <></>; }
    return (<Button
      text={constant.ADD_EMPLOYEE_BUTTON}
      hasIcon={true}
      icon={IconNames.ADD}
      iconPosition='lhs'
      variant='outline'
      onClick={() => { setIsOpen(!isOpen); }}
      size='sm'
    />);
  };

  useEffect(() => {
    void (async function getAllEmployees() {
      await getEmployees((businessId ?? '')).then(async (res) => {
        // @ts-expect-error
        const { employees } = res;
        // @ts-expect-error
        const employeeArray = employees.map(employee => ({
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${employee.firstName} ${employee.lastName}`,
          email: employee.email,
          role: employee.role,
        }));
        setEmployees(employeeArray);
      }).catch(error => {
        if (error?.cause !== 1) {
          alert(error.message);
        }
      });
    })();
  }, [businessId]);

  console.log(employees);
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
        rhs={<ActionList />}
      />
      <div className='p-3'>
        {isOpen ? (<AddForm onSubmit={onSubmit} />) : (<Table />)}
      </div>
    </>
  );
};

export default EmployeeDashboard;
