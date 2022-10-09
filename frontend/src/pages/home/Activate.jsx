import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/createPost/CreatePost';
import Header from '../../components/header/Header';
import LeftHome from '../../components/home/leftHome/LeftHome';
import Stories from '../../components/home/stories/Stories';
import RightHome from '../../components/home/rightHome/RightHome';

const Activate = () => {
  const { user } = useSelector((user) => ({ ...user }));

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className='home'>
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
