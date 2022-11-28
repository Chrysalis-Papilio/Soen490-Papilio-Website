import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from '../../../features/PageHeader';
import Button from '../../../components/Button';
import { IconNames } from '../../../components/Icon';
import { getProfile } from '../../../api/apiLayer';
import Row from './Row';

declare interface IProfileInformation {
  businessName: string
  address: string
  address2Line: string
  city: string
  province: string
  postalCode: string
  country: string
}

const ProfileInformation: IProfileInformation = {
  businessName: '',
  address: '',
  address2Line: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
};

const NAMES = {
  businessName: 'Business name',
  address: 'Address',
  address2Line: '',
  city: 'City',
  province: 'Province',
  postalCode: 'Postal Code',
  country: 'Country',
};

const ProfileDashboard = (): JSX.Element => {
  const { businessId } = useParams();
  const [profile, setProfile] = useState(ProfileInformation);

  useEffect(() => {
    void (async function get() {
      await getProfile((businessId ?? '')).then(() => {
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
        {Object.entries(profile).map(([key, value]) => {
          const [isEditing, setIsEditing] = useState(false);
          const onSubmit = async (data: IProfileInformation): Promise<void> => {
            setProfile(data);
            setIsEditing(false);
          };

          return (
            <div key={key} className='flex flex-row items-center mb-2'>
              <p className=' font-bold mr-4 w-1/4 text-right'>{NAMES[key as keyof typeof NAMES]}</p>
              {isEditing
                ? (
                  <Row
                    key={key}
                    data={key}
                    initialState={profile}
                    onSubmit={onSubmit}
                    />
                  )
                : (
                <div className='border rounded-sm p-4 flex-1 group flex flex-row items-center justify-between' data-testid='field' >
                  <span>{value}</span>
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
