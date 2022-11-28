import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Table from '../Activities/ActivityTable';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';
import { addActivity, getActivites } from '../../../api/apiLayer';
import { IActivityData, IActivity } from '../../../interfaces';

const tabs: ITab[] = [
  { label: constant.ALL_ACTIVITY_LABEL },
];

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className='border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white'>
    <span className="material-symbols-outlined">expand_more</span>
    <span className='flex-1'>User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const ActivityDashboard = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const { businessId } = useParams();

  const onSubmit = async (data: IFormData): Promise<void> => {
    const reqData: IActivityData = {
      activity: {
        title: data.activityTitle,
        description: data.activityDescription,
        costPerIndividual: parseFloat(data.activityCostIndv),
        costPerGroup: parseFloat(data.activityCostGroup),
        groupSize: parseFloat(data.activityGroupSize),
        startTime: data.activityStart,
        endTime: data.activityEnd,
      },
      address: { // TODO: Add address information to form
        mention: data.activityLocation,
        lineOne: '1234 Main Street',
        lineTwo: '',
        city: 'Montreal',
        state: 'QC',
        country: 'Canada',
        postalCode: 'EXAMPLE',
      },
      // image: data.activityImage,  // TODO: Add image information
    };
    await addActivity((businessId ?? ''), reqData);
  };

  useEffect(() => {
    void (async function getAllEmployees() {
      await getActivites((businessId ?? '')).then(async (res) => {
        const { activities } = res;
        const activitiesArray = activities.map(activity => ({
          ...activity,
        }));
        setActivities(activitiesArray);
      }).catch(error => {
        if (error?.cause !== 1) {
          alert(error.message);
        }
      });
    })();
  }, [businessId]);

  console.log(activities);
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
            text={constant.ADD_ACTIVITY_BUTTON}
            hasIcon={true}
            icon={IconNames.ADD}
            iconPosition='lhs'
            variant='outline'
            onClick={() => { setIsOpen(!isOpen); }}
            size='sm'
          />
        }
      />
      <div className='p-5'>
        {isOpen ? (<AddForm onSubmit={onSubmit} />) : (<Table />)}
      </div>
    </>
  );
};

export default ActivityDashboard;
