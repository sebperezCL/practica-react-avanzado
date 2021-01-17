import React from 'react';
import { FormHandlerContext } from './FormHandler';

const Input = props => {
  const { type, name, component: WrappedInput, ...rest } = props;

  const inputTypeCheck = (value, handleChange) => {
    if (type === 'password') {
      return (
        <WrappedInput.Password
          value={value}
          onChange={handleChange}
          name={name}
          {...rest}
        />
      );
    }
    return (
      <WrappedInput
        value={value}
        onChange={handleChange}
        name={name}
        {...rest}
      />
    );
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
