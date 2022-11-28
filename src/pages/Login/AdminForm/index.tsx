import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';

export declare interface IAdminForm {
  onSubmit: (data: IFormData) => Promise<void>
}

export interface IFormData {
  adminFirstName: string
  adminLastName: string
  adminEmail: string
  adminPassword: string
};

export const initialState: IFormData = {
  adminFirstName: '',
  adminLastName: '',
  adminEmail: '',
  adminPassword: '',
};

const AdminForm = ({ onSubmit }: IAdminForm): JSX.Element => {
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
        {...register(constant.INPUT_ADMIN_FIRST_NAME, { required: false, pattern: /.*/ })}
        placeholder={constant.INPUT_ADMIN_FIRST_NAME_PLACEHOLDER}
        label={constant.INPUT_ADMIN_FIRST_NAME_LABEL}
        hasLabel/>
      <Input
        {...register(constant.INPUT_ADMIN_LAST_NAME, { required: false, pattern: /.*/ })}
        placeholder={constant.INPUT_ADMIN_LAST_NAME_PLACEHOLDER}
        label={constant.INPUT_ADMIN_LAST_NAME_LABEL}
        hasLabel/>
      <Input
        {...register(constant.INPUT_ADMIN_EMAIL, { required: false, pattern: /.*/ })}
        placeholder={constant.INPUT_ADMIN_EMAIL_PLACEHOLDER}
        label={constant.INPUT_ADMIN_EMAIL_LABEL}
        hasLabel/>
      <Input
        {...register(constant.INPUT_ADMIN_PASSWORD, { required: false, pattern: /.*/ })}
        placeholder={constant.INPUT_ADMIN_PASSWORD_PLACEHOLDER}
        label={constant.INPUT_ADMIN_PASSWORD_LABEL}
        type="password"
        hasLabel/>
    </BoxForm>
  );
};

export default AdminForm;
