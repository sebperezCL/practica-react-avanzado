import React from 'react';
import { Checkbox as WrappedCheckbox } from 'antd';
import { FormHandlerContext } from './FormHandler';

const Checkbox = props => {
  const { name } = props;
  return (
    <FormHandlerContext.Consumer>
      {({ formValues, handleChange }) => (
        <WrappedCheckbox
          onChange={handleChange}
          checked={formValues[name]}
          {...props}
        />
      )}
    </FormHandlerContext.Consumer>
  );
};

export default Checkbox;
