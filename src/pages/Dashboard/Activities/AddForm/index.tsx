import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import useFormData from '../../../../hooks/useFormData';
import * as constant from './constant';
import UploadImage from '../UploadImage';

export declare interface AddFormInterface {
  onSubmit: (data: IFormData) => Promise<void>
}

export declare interface IFormData {
  activityTitle: string
  activityLocation: string
  activityDescription: string
  activityStart: string
  activityEnd: string
  activityCostIndv: string
  activityGroupSize: string
  activityCostGroup: string
  activityImage: string
};

const initialState: IFormData = {
  activityTitle: '',
  activityLocation: '',
  activityDescription: '',
  activityStart: '',
  activityEnd: '',
  activityCostIndv: '',
  activityGroupSize: '',
  activityCostGroup: '',
  activityImage: '',
};

const AddForm = ({ onSubmit }: AddFormInterface): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused1, _unused2, _unused3, register, submit] = useFormData<IFormData>({ initialState, onSubmit });

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">{constant.FORM_HEADLINE}</h2>
      <Input
        {...register(constant.INPUT_ACTIVITY_TITLE, { required: false, pattern: /.*/ })}
        placeholder={constant.INPUT_ACTIVITY_TITLE_PLACEHOLDER}
        label={constant.INPUT_ACTIVITY_TITLE_LABEL}
        hasLabel
      />
      <Input
        {...register(constant.INPUT_ACTIVITY_LOCATION, { required: false, pattern: /.*/ })}
        placeholder={constant.INPUT_ACTIVITY_LOCATION_PLACEHOLDER}
        label={constant.INPUT_ACTIVITY_LOCATION_LABEL}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            {...register(constant.INPUT_ACTIVITY_START, { required: false, pattern: /.*/ })}
            placeholder={constant.INPUT_ACTIVITY_START_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_START_LABEL}
            hasLabel
          />
        </div>
        <div>
          <Input
            {...register(constant.INPUT_ACTIVITY_END, { required: false, pattern: /.*/ })}
            placeholder={constant.INPUT_ACTIVITY_END_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_END_LABEL}
            hasLabel
          />
        </div>
      </div>
      <Input
        {...register(constant.INPUT_ACTIVITY_DESCRIPTION, { required: false, pattern: /.*/ })}
        placeholder={constant.INPUT_ACTIVITY_DESCRIPTION_PLACEHOLDER}
        label={constant.INPUT_ACTIVITY_DESCRIPTION_LABEL}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            {...register(constant.INPUT_ACTIVITY_COST_INDV, { required: false, pattern: /.*/ })}
            placeholder={constant.INPUT_ACTIVITY_COST_INDV_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_COST_INDV_LABEL}
            hasLabel
          />
        </div>
        <div className='pr-10'>
        <Input
            {...register(constant.INPUT_ACTIVITY_COST_GROUP, { required: false, pattern: /.*/ })}
            placeholder={constant.INPUT_ACTIVITY_COST_GROUP_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_COST_GROUP_LABEL}
            hasLabel
          />
        </div>
        <div>
        <Input
            {...register(constant.INPUT_ACTIVITY_GROUP, { required: false, pattern: /.*/ })}
            placeholder={constant.INPUT_ACTIVITY_GROUP_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_GROUP_LABEL}
            hasLabel
          />
        </div>
      </div>
      {/* TODO: Add value for image */}
      <UploadImage/>
      <br></br>
      <Button text={constant.BUTTON_TEXT} onClick={submit}/>
    </div>
  );
};

export default AddForm;
