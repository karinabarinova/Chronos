import React from 'react';
import {
    FormContentRight,
    FormSuccess,
    FormImage2
} from './Form.elements'

const image = require('../../images/welcome.svg').default

const FormSuccessSignIn = () => {
  return (
    <FormContentRight>
      <FormSuccess>We have received your request!</FormSuccess>
      <FormImage2 src={image} alt='success-image' />
    </FormContentRight>
  );
};

export default FormSuccessSignIn;