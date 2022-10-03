import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header/Header';
import LeftHome from '../../components/home/leftHome/LeftHome';

import './home.css';
import RightHome from './rightHome/RightHome';

const Home = () => {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <div>
      <Header />
      <LeftHome user={user} />
      <RightHome user={user} />
    </div>
  );
};

export default Home;
