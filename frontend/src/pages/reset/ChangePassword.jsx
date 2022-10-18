import { Form, Formik } from 'formik';

import { Link } from 'react-router-dom';
import LoginInput from '../../components/inputs/loginInput/LoginInput';

const ChangePassword = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
}) => {
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
