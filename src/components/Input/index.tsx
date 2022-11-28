import classNames from 'classnames';
import React from 'react';

export declare interface InputInterface {
  ref?: React.MutableRefObject<any>
  label?: string
  hasLabel?: boolean
  placeholder: string
  name: string
  value: any
  type?: 'text' | 'password'
  testId?: string
  size?: 'sm' | 'md' | 'lg'
  labelPosition?: 'top' | 'left'
  variant?: 'normal' | 'ghost'
  isError?: boolean
  onChange: (data: React.FormEvent<HTMLInputElement>) => void
  onBlur?: () => void
}

const Input = ({ ref, name, value, label, hasLabel = false, placeholder, onChange, type = 'text', testId, size = 'md', labelPosition = 'top', variant = 'normal', isError = false, onBlur = () => {} }: InputInterface): JSX.Element => {
  const className = classNames('flex items-center relative', {
    'mb-2': variant === 'normal',
    'pt-5': hasLabel,
    'pt-2': !hasLabel,
    'justify-end pt-0 mt-3': labelPosition === 'left',
    'pt-0 flex-1': variant === 'ghost',
  });

  const normalInputStyle = classNames('border-2 rounded focus:border-gray-400', {
    'px-2 py-1.5 text-sm': size === 'sm',
    'py-2 px-3': size === 'md',
    'py-3 px-3': size === 'lg',
    'w-4/6': labelPosition === 'left',
    'flex-1': labelPosition === 'top',
    'border-red-500 focus:border-red-500': isError,
  });

  const ghostInputStyle = classNames('w-full bg-transparent');

  const inputStyle = classNames('focus:outline-none placeholder-gray-300', {
    [normalInputStyle]: variant === 'normal',
    [ghostInputStyle]: variant === 'ghost',
  });

  const labelStyle = classNames({
    'absolute top-0.5 left-0.5 text-sm font-semibold text-gray-600': labelPosition === 'top',
    'mr-3': labelPosition === 'left',
  });

  return (
    <div className={className} >
      {hasLabel && <label htmlFor={name} className={labelStyle}>{label}</label>}
      <input
        ref={ref}
        name={name}
        id={name}
        className={inputStyle}
        data-testid={testId}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
