import './reset.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useState } from 'react';

import SearchAccount from './SearchAccount';
import SendEmail from './SendEmail';
import CodeVerification from './CodeVerification';
import Footer from '../../components/login/Footer';
import ChangePassword from './ChangePassword';

const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfos, setUserInfos] = useState('');
  const [visible, setVisible] = useState(0);

  const logout = () => {
    Cookies.set('user', '');
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/login');
  };

  console.log(userInfos);

  return (
    <div className='reset'>
      <div className='reset_header'>
        <img src='../../../icons/facebook.svg' alt='' />
        {user ? (
          <div className='right_reset'>
            <Link to='/profile'>
              <img src={user.picture} alt='' />
            </Link>
            <button
              className='blue_btn'
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login' className='right_reset'>
            <button className='blue_btn'>Login</button>
          </Link>
        )}
      </div>
      <div className='reset_wrap'>
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && <SendEmail userInfos={userInfos} />}
        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            error={error}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
