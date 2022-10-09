import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/createPost/CreatePost';
import Header from '../../components/header/Header';
import LeftHome from '../../components/home/leftHome/LeftHome';
import Stories from '../../components/home/stories/Stories';

import './home.css';
import RightHome from '../../components/home/rightHome/RightHome';

const Home = () => {
  const { user } = useSelector((user) => ({ ...user }));

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

export default Home;
