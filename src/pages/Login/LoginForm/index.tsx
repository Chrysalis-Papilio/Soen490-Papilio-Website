import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';

export declare interface ILoginForm {
  onSubmit: (data: IFormData) => Promise<void>
}

export interface IFormData {
  email: string
  password: string
  businessId: string
};

export const initialState: IFormData = {
  email: '',
  password: '',
  businessId: '',
};

const LoginForm = ({ onSubmit }: ILoginForm): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused1, _unused2, _unused3, register, submit] = useFormData<IFormData>({ initialState, onSubmit });

  return (
    <BoxForm
        heading={constant.FORM_HEADING}
        buttonText={constant.SUBMIT_BUTTON_TEXT}
        buttonOnClick={submit}
        backButtonTo=''
        hasBack
    >
      <Input
        {...register(constant.INPUT_EMAIL, { required: false, pattern: /.*/ })}
        name={constant.INPUT_EMAIL}
        placeholder={constant.INPUT_EMAIL_PLACEHOLDER}
        label={constant.INPUT_EMAIL_LABEL}
        hasLabel/>
      <Input
        {...register(constant.INPUT_PASSWORD, { required: false, pattern: /.*/ })}
        placeholder={constant.INPUT_PASSWORD_PLACEHOLDER}
        label={constant.INPUT_PASSWORD_LABEL}
        type='password'
        hasLabel/>
      <Input
        {...register(constant.INPUT_BUSINESS_ID, { required: false, pattern: /.*/ })}
        placeholder={constant.INPUT_BUSINESS_ID_PLACEHOLDER}
        label={constant.INPUT_BUSINESS_ID_LABEL}
        hasLabel/>
    </BoxForm>
  );
};

export default LoginForm;
