import { useState } from 'react';

function useForm(initialForm) {
  const [form, setForm] = useState(initialForm);

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return [form, handleFormChange];
}

export default useForm;
