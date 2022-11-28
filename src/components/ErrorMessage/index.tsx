import { ERROR_CODE } from '../../utils/enum';

export declare interface IErrorMessage {
  isError: boolean
  message: string
}

export const createMessage = (error: number, requiredMessage: string = '', patternMessage: string = ''): string => {
  if (error === ERROR_CODE.PATTERN_ERROR) {
    return patternMessage;
  }
  if (error === ERROR_CODE.REQUIRED_ERROR) {
    return requiredMessage;
  }
  return 'There was an unexpected error. Please try again.';
};

const ErrorMessage = ({ isError, message }: IErrorMessage): JSX.Element => {
  if (!isError) return <></>;

  return (
    <span className='flex text-red-500 text-sm items-center pl-2 -mt-1.5'>
      <span className="material-symbols-outlined mr-1 text-base">
        error
      </span>
      {message}
    </span>
  );
};

export default ErrorMessage;
