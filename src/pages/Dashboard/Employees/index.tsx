/* eslint multiline-ternary: ["error", "always-multiline"] */
import { useEffect, useState } from 'react';
import {
  // sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useParams } from 'react-router-dom';

import { auth } from '../../../firebase';
import Table, { employeeTableHeader } from '../../../features/Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import DeleteForm from './DeleteForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';
import {
  addEmployee,
  deleteEmployees,
  getEmployees,
} from '../../../api/apiLayer';
import { IEmployeeData, EmployeeRowProps } from '../../../interfaces';
import { useAuth } from '../../../hooks/useEmployee';

enum Section {
  Table,
  Add,
  Delete,
}

const tabs: ITab[] = [
  { label: constant.ALL_EMPLOYEES_LABEL },
  { label: constant.ADMIN_LABEL },
  { label: constant.NORMAL_LABEL },
];

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className="border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white">
    <span className="material-symbols-outlined">expand_more</span>
    <span className="flex-1">User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const EmployeeDashboard = (): JSX.Element => {
  const { employee } = useAuth();
  const { businessId } = useParams();
  const [employees, setEmployees] = useState<EmployeeRowProps[]>([]);
  const [currentSection, setCurrentSection] = useState(Section.Table);
  const [token, setToken] = useState(false);

  const handleEmployeeCreation = async (data: IFormData): Promise<any> => {
    return await createUserWithEmailAndPassword(
      auth,
      data.employeeEmail,
      data.employeePassword,
    )
      .then(async (userCredential) => {
        const user = userCredential.user;
        const reqData: IEmployeeData = {
          firebase_id: user.uid,
          firstName: data.employeeFirstName,
          lastName: data.employeeLastName,
          email: data.employeeEmail,
          role: data.role,
          root: false, // True only while creating the business
        };
        return await addEmployee(businessId ?? '', reqData);
      })
      .then(() => {
        setCurrentSection(Section.Table);
        setToken(!token);
      });
  };

  const handleEmployeeDeletion = async (
    employeeIds: string[],
  ): Promise<void> => {
    await deleteEmployees(employeeIds, employee.businessId).then(async () => {
      setEmployees(
        employees.filter((employee) => !employeeIds.includes(employee.id)),
      );
      setCurrentSection(Section.Table);
    });
  };

  const ActionList = (): JSX.Element => {
    switch (currentSection) {
      case Section.Add:
      case Section.Delete:
        return (
          <Button
            text="Close"
            icon={IconNames.CLOSE}
            iconPosition="lhs"
            variant="outline"
            onClick={() => setCurrentSection(Section.Table)}
            size="sm"
            hasIcon
          />
        );
      default:
        return (
          <div className="flex space-x-2">
            <Button
              text={constant.ADD_EMPLOYEE_BUTTON}
              icon={IconNames.ADD}
              iconPosition="lhs"
              variant="outline"
              onClick={() => setCurrentSection(Section.Add)}
              size="sm"
              hasIcon
            />
            <Button
              text={constant.DELETE_EMPLOYEE_BUTTON}
              icon={IconNames.DELETE}
              iconPosition="lhs"
              variant="outline"
              onClick={() => setCurrentSection(Section.Delete)}
              size="sm"
              hasIcon
            />
          </div>
        );
    }
  };

  useEffect(() => {
    void (async function () {
      await getEmployees(businessId ?? '')
        .then(setEmployees)
        .catch((error) => {
          if (error?.cause !== 1) {
            console.error(error.message);
          }
        });
    })();
  }, [businessId, token]);

  let currentForm: JSX.Element = <></>;
  if (currentSection === Section.Delete) {
    currentForm = (
      <DeleteForm onSubmit={handleEmployeeDeletion} employees={employees} />
    );
  } else if (currentSection === Section.Add) {
    currentForm = <AddForm onSubmit={handleEmployeeCreation} />;
  } else {
    currentForm = (
      <Table rowsData={employees} headerContent={employeeTableHeader} />
    );
  }

  return (
    <>
      <PageHeader
        header={constant.HEADER}
        subtitle={constant.SUBHEADER}
        rhs={
          <>
            <SearchBar
              placeholder={constant.SEARCHBAR_PLACEHOLDER}
              onClick={() => {}}
              margin="right"
            />
            <Box />
          </>
        }
      />
      <ListBanner
        tabs={tabs}
        rhs={employee.role === 'Admin' && <ActionList />}
      />
      <div className="p-3">{currentForm}</div>
    </>
  );
};

export default EmployeeDashboard;
