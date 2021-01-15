import React from 'react';
import { Input as WrappedInput } from 'antd';
import { FormHandlerContext } from './FormHandler';

const Input = props => {
  const { type, name } = props;

  const inputTypeCheck = (value, handleChange) => {
    if (type === 'password') {
      return (
        <WrappedInput.Password
          value={value}
          onChange={handleChange}
          {...props}
        />
      );
    }
    return <WrappedInput value={value} onChange={handleChange} {...props} />;
  };

  return (
    <FormHandlerContext.Consumer>
      {({ formValues, handleChange }) =>
        inputTypeCheck(formValues[name], handleChange)
      }
    </FormHandlerContext.Consumer>
  );
};

export default Input;
