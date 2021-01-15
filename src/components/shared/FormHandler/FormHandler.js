import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiLoading } from '../../../store/ducks/app';

const FormHandler = ({ configFields, children, onSubmit }) => {
  const loading = useSelector(apiLoading);
  const dispatch = useDispatch();

  const initialValues = Object.keys(configFields).reduce((acc, val) => {
    return { ...acc, [val]: configFields[val].value };
  }, {});

  const [form, setForm] = useState(initialValues);

  const canSubmit = () => {
    return Object.keys(form)
      .map(f => {
        if (!form[f] && configFields[f].required) {
          return false;
        }
        return true;
      })
      .reduce((acc, val) => acc && val, true);
  };

  const handleChange = ev => {
    const { name, type, value, checked } = ev.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  return children(
    form,
    handleChange,
    canSubmit,
    loading,
    onSubmit(form, dispatch)
  );
};

export default FormHandler;
