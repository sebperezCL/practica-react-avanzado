import { useState } from 'react';

const useForm = initialValue => {
  const [formValues, setForm] = useState(initialValue);

  const handleChange = ev => {
    const { name, type, value, checked } = ev.target;
    setForm({ ...formValues, [name]: type === 'checkbox' ? checked : value });
  };

  return [formValues, handleChange];
};

export default useForm;
