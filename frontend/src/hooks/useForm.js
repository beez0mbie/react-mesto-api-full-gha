import { useState } from 'react';

export const useForm = (inputValues = {}) => {
  const [formValues, setFormValues] = useState(inputValues);

  const handleChangeForm = (evt) => {
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return { formValues, setFormValues, handleChangeForm };
};
