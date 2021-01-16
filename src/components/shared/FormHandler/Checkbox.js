import React from 'react';
import { FormHandlerContext } from './FormHandler';

const Checkbox = props => {
  const { name, component: WrappedCheckbox } = props;
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
