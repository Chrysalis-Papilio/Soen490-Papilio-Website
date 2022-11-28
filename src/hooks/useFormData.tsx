import { useEffect, useState } from 'react';

import { ERROR_CODE } from '../utils/enum';

export declare interface IErrorTemplate {
  [key: string]: IError
}

declare interface IError {
  required: boolean
  pattern: RegExp
}

declare interface IErrorMessages {
  [key: string]: number
}

declare interface IRegisterReturn {
  name: string
  value: any
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onBlur: () => void
  isError: boolean
}

export declare interface IUseFormData<T> {
  initialState: T
  onSubmit: (data: T) => Promise<void>
}

const useFormData = <T extends {}>({ initialState, onSubmit }: IUseFormData<T>): [T, boolean, { [key: string]: number }, (name: string, options: IError) => IRegisterReturn, () => Promise<void>] => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setError] = useState<IErrorMessages>({});
  const [validation, setValidation] = useState<IErrorTemplate>({});
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (): Promise<void> => {
    setLoading(true);
    await validateFormData()
      .then(onSubmit)
      .catch(e => console.error(e.message));
    setLoading(false);
  };

  const validateFormData = async (): Promise<T> => {
    const result = Object.entries(validation)
      .map(([key, value]) => {
        const temp = validate(value, key, formData[key as keyof T]);
        setError(prev => ({ ...prev, ...temp }));
        return temp;
      })
      .filter(x => Object.keys(x).length > 0);

    if (Object.keys(result).length === 0) {
      return await Promise.resolve(formData);
    }
    return await Promise.reject(new Error('Error are present'));
  };

  const validate = (error: IError, key: string, value: any): IErrorMessages => {
    let result: IErrorMessages = {};
    result[key] = errors[key as keyof IErrorMessages];
    if (error.required && value === '') {
      result[key] = ERROR_CODE.REQUIRED_ERROR;
      // setError(prev => ({ ...prev, [key]: ERROR_CODE.REQUIRED_ERROR }));
    } else if (typeof value === 'string' && !error.pattern.test(value)) {
      result[key] = ERROR_CODE.PATTERN_ERROR;
      // setError(prev => ({ ...prev, [key]: ERROR_CODE.PATTERN_ERROR }));
    } else {
      setError(prev => {
        const { [key]: string, ...rest } = prev;
        return rest;
      });
      result = {};
    }
    return result;
  };

  const register = (name: string, options: { required: boolean, pattern: RegExp }): IRegisterReturn => {
    useEffect(() => {
      setValidation(prev => ({ ...prev, [name]: options }));
    }, []);

    const onBlur = (): void => setError(prev => ({ ...prev, ...validate(options, name, formData[name as keyof T]) }));
    const value = formData[name as keyof T];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return { name, value, onChange, onBlur, isError: !!errors[name as keyof IErrorMessages] };
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    validate(validation[name], name, value);
    setFormData((data: T) => ({ ...data, [name]: value }));
  };

  return [formData, loading, errors, register, submit];
};

export default useFormData;
