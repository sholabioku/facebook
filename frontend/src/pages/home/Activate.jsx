import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

import CreatePost from '../../components/createPost/CreatePost';
import Header from '../../components/header/Header';
import LeftHome from '../../components/home/leftHome/LeftHome';
import Stories from '../../components/home/stories/Stories';
import RightHome from '../../components/home/rightHome/RightHome';
import ActivateForm from './ActivateForm';

const Activate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { user } = useSelector((user) => ({ ...user }));

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/activate`,
          { token },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setSuccess(data.message);
        Cookies.set('user', JSON.stringify({ ...user, verified: true }));
        dispatch({ type: 'VERIFY', payload: true });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        setError(error.response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };
    activateAccount();
  }, [token, user.token]);

  return (
    <div className='home'>
      {success && (
        <ActivateForm
          type='success'
          header='Account verification succeeded'
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type='error'
          header='Account verification failed'
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Activate;
