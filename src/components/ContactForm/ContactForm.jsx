import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';

import { FromButton } from './ContactForm.styled';

const formatPhoneNumber = value => {
  return value.replace(/(\d{3})(\d{2})(\d{2})/g, '$1-$2-$3');
};

const initialValues = {
  name: '',
  number: '',
};

const FromPhonebook = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 20px;
`;

const Input = styled(Field)`
  display: block;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
`;

let schema = yup.object().shape({
  name: yup.string().required(),
  number: yup
    .string()
    .required()
    .min(7)
    .max(10)
    .matches(/(\d{3})(\d{2})(\d{2})/g, '$1-$2-$3'),
});

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const fromattedValue = formatPhoneNumber(values.number);
    onSubmit(values.name, fromattedValue);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FromPhonebook>
        <label>
          Name
          <Input type="text" name="name" required />
          <ErrorMessage name="name" />
        </label>
        <label>
          Number
          <Input type="tel" name="number" />
          <ErrorMessage name="number" />
        </label>
        <FromButton type="submit">Add contact</FromButton>
      </FromPhonebook>
    </Formik>
  );
};
