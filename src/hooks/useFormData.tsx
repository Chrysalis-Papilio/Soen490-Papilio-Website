import { useEffect, useState } from 'react';
import {
  combine,
  match,
  required,
  hasLength,
  validateFields,
} from '../utils/formValidation';

export const DEFAULT_REQUIRED_MESSAGE = 'This field is required';
export const DEFAULT_PATTERN_MESSAGE =
  "This field doesn't match the required pattern.";
export const getDefaultMinLengthMessage = (len: number): string =>
  `This field should be ${len} characters long.`;

export declare interface InputOptionsProps {
  required?: boolean | RequiredProps;
  pattern?: RegExp | PatternProps;
  minLength?: number | MinLengthProps;
}

declare interface IErrorMessages {
  [key: string]: string;
}

declare interface IRegisterReturn {
  name: string;
  value: any;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onManualChange: (name: string, value: string) => void;
  isError: boolean;
}

declare interface ValidatorProps {
  [key: string]: Function;
}

export declare interface RequiredProps {
  required: boolean;
  message: string;
}

export declare interface PatternProps {
  pattern: RegExp;
  message: string;
}

export declare interface MinLengthProps {
  minLength: number;
  message: string;
}

export declare interface IUseFormData<T> {
  initialState: T;
  onSubmit: (data: T) => Promise<void>;
}

const validatorType = (type: 'required' | 'pattern'): Function => {
  switch (type) {
    case 'required':
      return required;
    case 'pattern':
      return match;
  }
};

const useFormData = <T extends {}>({
  initialState,
  onSubmit,
}: IUseFormData<T>): [
  T,
  boolean,
  IErrorMessages,
  (name: string, options?: InputOptionsProps) => IRegisterReturn,
  () => Promise<void>,
] => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<IErrorMessages>({});
  const [validators, setValidators] = useState<ValidatorProps>({});
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (): Promise<void> => {
    setLoading(true);
    await validateFormData()
      .then(onSubmit)
      .catch((e) => setErrors((prev) => ({ ...prev, general: e.message })));
    setLoading(false);
  };

  const validateFormData = async (): Promise<T> => {
    const errors = validateFields(validators, formData);
    setErrors(errors);

    if (Object.values(errors).every((error) => error === undefined)) {
      return await Promise.resolve(formData);
    } else {
      return await Promise.reject(new Error('Error(s) are present'));
    }
  };

  const validates = (key: string, value: any): void => {
    const prev = errors[key];
    if (prev !== undefined) {
      setErrors((prev) => ({
        ...prev,
        [key]: validators[key](value),
      }));
    }
  };

  const register = (
    name: string,
    options: {
      required?: boolean | RequiredProps;
      pattern?: RegExp | PatternProps;
      minLength?: number | MinLengthProps;
    } = {},
  ): IRegisterReturn => {
    useEffect(() => {
      let validators: Function[] = [];
      if (options.required !== undefined) {
        if (typeof options.required === 'object' && options.required.required) {
          validators = [
            ...validators,
            validatorType('required')(options.required.message),
          ];
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        } else if (options.required) {
          validators = [
            ...validators,
            validatorType('required')(DEFAULT_REQUIRED_MESSAGE),
          ];
        }
      }
      if (options.pattern !== undefined) {
        if (options.pattern instanceof RegExp) {
          validators = [
            ...validators,
            validatorType('pattern')(options.pattern, DEFAULT_PATTERN_MESSAGE),
          ];
        } else {
          validators = [
            ...validators,
            validatorType('pattern')(
              options.pattern.pattern,
              options.pattern.message,
            ),
          ];
        }
      }
      if (options.minLength !== undefined) {
        if (typeof options.minLength === 'number') {
          validators = [
            ...validators,
            hasLength(
              options.minLength,
              getDefaultMinLengthMessage(options.minLength),
            ),
          ];
        } else {
          validators = [
            ...validators,
            hasLength(options.minLength.minLength, options.minLength.message),
          ];
        }
      }
      setValidators((prev) => ({
        ...prev,
        [name]: combine(...validators),
      }));
    }, []);

    const onBlur = (): void =>
      setErrors((prev) => ({
        ...prev,
        [name]: validators[name](formData[name as keyof T]),
      }));
    const value = formData[name as keyof T];

    const onManualChange = (name: string, value: string): void => {
      validates(name, value);
      setFormData((data: T) => ({ ...data, [name]: value }));
    };

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return {
      name,
      value,
      onChange,
      onBlur,
      onManualChange,
      isError: !!errors[name as keyof IErrorMessages],
    };
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    validates(name, value);
    setFormData((data: T) => ({ ...data, [name]: value }));
  };

  return [formData, loading, errors, register, submit];
};

export default useFormData;
