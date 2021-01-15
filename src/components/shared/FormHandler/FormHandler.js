import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiLoading } from '../../../store/ducks/app';

export const FormHandlerContext = React.createContext();

const FormHandler = ({ configFields, children, onSubmit }) => {
  const initialValues = Object.keys(configFields).reduce((acc, val) => {
    return { ...acc, [val]: configFields[val].value };
  }, {});

  const [formValues, setForm] = useState(initialValues);
  const loading = useSelector(apiLoading);
  const dispatch = useDispatch();

  const handleChange = ev => {
    const { name, type, value, checked } = ev.target;
    setForm({ ...formValues, [name]: type === 'checkbox' ? checked : value });
  };

  const canSubmit = () => {
    return Object.keys(formValues)
      .map(f => {
        if (!formValues[f] && configFields[f].required) {
          return false;
        }
        return true;
      })
      .reduce((acc, val) => acc && val, true);
  };

  return (
    <FormHandlerContext.Provider value={{ formValues, setForm, handleChange }}>
      {children(canSubmit, loading, onSubmit(formValues, dispatch))}
    </FormHandlerContext.Provider>
  );
};

export default FormHandler;
