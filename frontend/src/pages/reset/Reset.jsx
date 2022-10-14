import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import './reset.css';

const Reset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const logout = () => {
    Cookies.set('user', '');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className='reset'>
      <div className='reset_header'>
        <img src='../../../icons/facebook.svg' alt='' />
        {user ? (
          <div className='right_reset'>
            <Link to='/profile'>
              <img src={user.picture} alt='' />
            </Link>
            <button className='blue_btn' onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login' className='right_reset'>
            <button className='blue_btn'>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Reset;
