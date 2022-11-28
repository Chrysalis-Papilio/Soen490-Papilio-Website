import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';
import ErrorMessage, { createMessage } from '../../../components/ErrorMessage';

export declare interface IBusinessForm {
  onSubmit: (data: IFormData) => Promise<void>
}

export declare interface IFormData {
  businessId: string
}

export const initialState: IFormData = {
  businessId: '',
};

const BusinessForm = ({ onSubmit }: IBusinessForm): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused1, _unused2, errors, register, submit] = useFormData<IFormData>({ initialState, onSubmit });

  return (
    <BoxForm
      heading={constant.FORM_HEADING}
      buttonText={constant.SUBMIT_BUTTON_TEXT}
      buttonOnClick={submit}
    >
      <Input
      {...register(constant.INPUT_BUSINESS_ID, { required: true, pattern: /.*/ })}
        placeholder={constant.INPUT_BUSINESS_PLACEHOLDER}
      />
      <ErrorMessage
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        isError={!!errors[constant.INPUT_BUSINESS_ID]}
        message={
          createMessage(
            errors[constant.INPUT_BUSINESS_ID],
            constant.REQUIRED_MESSAGE
          )
        }
      />
    </BoxForm>
  );
};

export default BusinessForm;
