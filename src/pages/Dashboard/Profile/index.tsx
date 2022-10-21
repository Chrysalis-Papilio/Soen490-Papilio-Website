import { useState, useEffect } from 'react';

import PageHeader from '../../../features/PageHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { IconNames } from '../../../components/Icon';
import { useParams } from 'react-router-dom';

const ProfileInformation: { [key: string]: string } = {
  'Business name': '',
  Address: '',
  '': '',
  'Postal Code': '',
  City: '',
  Province: '',
  Country: '',
};

const ProfileDashboard = (): JSX.Element => {
  const { businessId } = useParams();
  const [profile, setProfile] = useState(ProfileInformation);

  useEffect(() => {
    void (async function getProfile () {
      await fetch(`/api/business/get/${businessId ?? ''}`, {
        method: 'GET',
      }).then(() => {
        // TODO: Setup profile the fetch response
        setProfile(ProfileInformation);
      });
    })();
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <PageHeader
        header='Business profile'
      />
      <div className='m-4 flex-1 p-4'>
        {Object.entries(profile).map((entry) => {
          const [isEditing, setIsEditing] = useState(false);
          const onSubmit = async (): Promise<void> => {
            setIsEditing(false);
          };

          return (
          <div key={entry[0]} className='flex flex-row items-center mb-2'>
            <p className=' font-bold mr-4 w-1/4 text-right'>{entry[0]}</p>
            {isEditing
              ? (
                <div className='border rounded-sm border-brand-blue-dark bg-brand-blue-light p-4 flex-1 group flex flex-row items-center justify-between'>
                  <Input
                    name={entry[0]}
                    value={entry[1]}
                    placeholder=''
                    variant='ghost'
                    onChange={() => {}}
                    />
                  <Button
                    variant='ghost'
                    icon={IconNames.SAVE}
                    onClick={onSubmit}
                    hasIcon
                  />
                </div>
                )
              : (
                <div className='border rounded-sm p-4 flex-1 group flex flex-row items-center justify-between' data-testid='field' >
                  <span>{entry[1]}</span>
                  <div className='text-white group-hover:text-black'>
                    <Button
                      variant='ghost'
                      icon={IconNames.EDIT_SQUARE}
                      onClick={() => { setIsEditing(true); }}
                      hasIcon
                      />
                  </div>
                </div>
                )
            }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileDashboard;