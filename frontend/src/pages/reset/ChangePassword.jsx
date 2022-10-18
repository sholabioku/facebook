import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import LoginInput from '../../components/inputs/loginInput/LoginInput';

const ChangePassword = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
}) => {
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        'Enter a combination of atleast six numbers, letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters')
      .max(36, "Password can't be more than 36 characters"),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Password must match'),
  });

  return (
    <div className='reset_form' style={{ height: '310px' }}>
      <div className='reset_form_header'>Change Password</div>
      <div className='reset_form_text'>Pick a strong password.</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          confirmPassword,
        }}
        validationSchema={validatePassword}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='text'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New password'
            />
            <LoginInput
              type='text'
              name='confirmPassword'
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm new password'
            />
            {error && <div className='error_text'>{error}</div>}
            <div className='reset_form_btns'>
              <Link to='/login' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
