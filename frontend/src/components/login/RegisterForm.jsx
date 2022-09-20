import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { DotLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

import RegisterInput from '../inputs/registerInput/RegisterInput';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };
  const [user, setUser] = useState(userInfos);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const tempYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => tempYear - index);

  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };

  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, 'Last name must be between 2 and 16 characters.')
      .max(16, 'Last name must be between 2 and 16 characters')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need tp reset you password."
      )
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of atleast six numbers, letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters')
      .max(36, "Password can't be more than 36 characters"),
  });

  const [birthDateError, setBirthDateError] = useState('');
  const [genderError, setGenderError] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError('');
      setSuccess(data.message);
      const { message, ...restOfUserData } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: restOfUserData });
      }, 2000);
      Cookies.set('user', JSON.stringify(restOfUserData));
      navigate('/');
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon' />
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atLeats14Yrs = new Date(1970 + 14, 0, 1);
            let atMost70Yrs = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atLeats14Yrs) {
              setBirthDateError(
                "it looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (current_date - picked_date > atMost70Yrs) {
              setBirthDateError(
                "it looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (gender === '') {
              setBirthDateError('');
              setGenderError(
                'Please choose a gender. You can change who can see this later.'
              );
            } else {
              setBirthDateError('');
              setGenderError('');
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='First name'
                  name='first_name'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='text'
                  placeholder='Surname'
                  name='last_name'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='Mobile number or email address'
                  name='email'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='password'
                  placeholder='New password'
                  name='password'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_col_header'>
                  Date of birth <i className='info_icon' />
                </div>
                <DateOfBirthSelect
                  bYear={bYear}
                  bMonth={bMonth}
                  bDay={bDay}
                  years={years}
                  months={months}
                  days={days}
                  birthDateError={birthDateError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_col_header'>
                  Gender <i className='info_icon' />
                </div>
                <GenderSelect
                  genderError={genderError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Data Policy &nbsp;</span> and
                <span> Cookie Policy.</span>You may receive SMS notifications
                from us and can opt out at any time.
              </div>
              <div className='reg_btn_wrapper'>
                <button type='submit' className='blue_btn open_signup'>
                  Sign Up
                </button>
              </div>
              <DotLoader color='#1876f2' loading={loading} size={30} />
              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
