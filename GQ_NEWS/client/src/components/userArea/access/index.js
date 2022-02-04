import React, { useState /*, useEffect */ } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { signupUser, loginUser } from '../../../store/actions';
import ToastHandler from '../../utils/toasts';

const UserAccess = ({ history }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState(true);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Sorry, email is required'),
      password: Yup.string()
        .min(3, 'Must be more than 5 characters')
        .required('Sorry, password is required'),
    }),
    onSubmit: (values) => {
      onSubmitHandler(values);
    }
  });

  const switchTypeHandler = () => setType(!type);

  const onSubmitHandler = (values) => {
    console.log('onSubmitHandler====', values);

    if (type) {
      dispatch(loginUser(values))
        .then(({ payload }) => { successHandler(payload); });
    } else {
      dispatch(signupUser(values))
        .then(({ payload }) => { successHandler(payload); });
    }
  };

  const successHandler = (payload)  =>  {
    const errors = payload.errors;
    const auth = payload.auth;

    if (errors) {
      ToastHandler(errors, 'ERROR');
    }
    if (auth) {
      localStorage.setItem('X-AUTH', auth.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
      ToastHandler('Welcome', 'SUCCESS');
      history.push('/user_area');
    }
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row className='mb-4'>
          <Col>
            <h1>Sign in / Register</h1>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your email'
            id='email'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email
            && <Alert variant='danger'>{formik.errors.email}</Alert>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            id='password'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password
            && <Alert variant='danger'>{formik.errors.password}</Alert>}
        </Form.Group>


        <Button variant='primary' type='submit'>
          {type ? 'Sign in' : 'Register'}
        </Button>

        <Button
          variant='secondary'
          className='ml-2'
          onClick={switchTypeHandler}
        >
          Already {type ? 'signed in' : 'registered'}? Click here
        </Button>
      </Form>
    </>
  );
}

export default UserAccess;
