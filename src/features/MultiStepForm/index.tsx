import classNames from 'classnames';
import { useEffect, useState } from 'react';
import AdminForm, { IFormData as AdminData } from './AdminForm';
import ProfileForm, { IFormData as ProfileData } from './ProfileForm';

import Button from '../../components/Button';
import { useLocation } from 'react-router-dom';

export declare interface IMultiStepForm {
  progress: Progress[]
  steps: Step[]
  onSubmit: (data: IFormData) => Promise<void>
}

export declare interface Progress {
  icon: IProgressBall['icon']
  text: string
}

export declare interface Step {
  stepId: string
  caption: string
  last: boolean
}

export declare interface InputInterface {
  name: string
  label: string
}

declare interface IProgressBall {
  icon: 'feed' | 'admin_panel_settings' | 'done_all'
  text: string
  selected: boolean
}

const ProgressBall = ({ icon, text, selected }: IProgressBall): JSX.Element => {
  const style = classNames('material-symbols-outlined whitespace-nowrap bg-white rounded-full p-1.5', {
    'text-brand-orange-light': selected,
    'text-brand-blue-dark': !selected,
  });

  const textStyle = classNames('absolute origin-left left-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs', {
    'text-brand-orange-light': selected,
    'text-white': !selected,
  });
  return (
    <div className='mb-5 last:mb-0 z-50 relative'>
      <i className={style}>{icon}</i>
      <span className={textStyle}>{text}</span>
    </div>
  );
};

export interface IFormData {
  businessId: string
  profile: ProfileData
  adminAccount: AdminData
}

export const initialState: IFormData = {
  businessId: '',
  profile: {
    businessName: '',
    addressLineOne: '',
    addressLineTwo: '',
    postalCode: '',
    city: '',
    country: '',
    province: '',
  },
  adminAccount: {
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPassword: '',
    role: 'Admin',
  },
};

const MultiStepForm = ({ progress, steps, onSubmit }: IMultiStepForm): JSX.Element => {
  const location = useLocation();
  const [formData, setFormData] = useState(initialState);
  let onStepChange = async (data: any): Promise<void> => { console.log(data); setStep(prev => prev + 1); };
  const submit = async (): Promise<void> => await onSubmit(formData);
  let onBack = async (data: any): Promise<void> => { console.log(data); setStep(prev => prev - 1); };

  const [step, setStep] = useState(0);

  let Body: JSX.Element;
  if (steps[step].stepId === 'profile') {
    onStepChange = async (data) => {
      setFormData((prev) => ({ ...prev, profile: data }));
      setStep(prev => prev + 1);
    };
    Body = <ProfileForm initialState={formData.profile} onSubmit={onStepChange}/>;
  } else if (steps[step].stepId === 'adminAccount') {
    onStepChange = async (data) => {
      setFormData((prev) => ({ ...prev, adminAccount: data }));
      setStep(prev => prev + 1);
    };
    onBack = async (data) => {
      setFormData((prev) => ({ ...prev, adminAccount: data }));
      setStep(prev => prev - 1);
    };
    Body = <AdminForm initialState={formData.adminAccount} onSubmit={onStepChange} onBack={onBack}/>;
  } else {
    Body = <div>Finish Yeah!!!
      <Button text='submit' onClick={submit} />
    </div>;
  }

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      businessId: location.state.businessId,
    }));
  }, []);

  return (
    <div className="flex flex-row border border-brand-blue-dark w-4/6">
      <div className="bg-brand-blue-dark px-9 flex flex-col items-center pb-9 overflow-hidden w-64">
        <div className='-mt-8 bg-brand-blue-dark'>
          <span className='font-display text-ultra text-brand-blue-light-dark'>{(step + 1)}</span>
        </div>
        <h2 className='pt-6 pb-8 text-2xl font-medium text-center leading text-white'>{steps[step].caption}</h2>
        <div className='w-max flex flex-1 items-center'>
          <div className='flex flex-col items-center h-max relative pr-28 flex-1'>
            <span className='bg-white w-0.5 top-0 bottom-0 absolute'></span>
            {progress.map(({ icon, text }, index) => (
              <ProgressBall key={text} icon={icon} text={text} selected={step === index}/>
            ))}
          </div>
        </div>
      </div>
      <div className='p-9 flex flex-1 flex-col'>
        {Body}
      </div>
    </div>
  );
};

export default MultiStepForm;
