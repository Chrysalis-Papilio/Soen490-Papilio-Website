import useFormData from '../../../hooks/useFormData';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { IconNames } from '../../../components/Icon';

const Row = ({ data, initialState, onSubmit }: { data: string, initialState: {}, onSubmit: (data: any) => Promise<void> }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused1, _unused2, _unused3, register, submit] = useFormData({ initialState, onSubmit });

  return (
    <div className='border rounded-sm border-brand-blue-dark bg-brand-blue-light p-4 flex-1 group flex flex-row items-center justify-between'>
      <Input
        {...register(data, { required: false, pattern: /.*/ })}
        placeholder=''
        variant='ghost'
        />
      <Button
        variant='ghost'
        icon={IconNames.SAVE}
        onClick={submit}
        hasIcon
      />
    </div>
  );
};

export default Row;
