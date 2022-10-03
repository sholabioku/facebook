import { useState } from 'react';
import { Link } from 'react-router-dom';
import { left } from '../../../data/home';
import LeftLink from './LeftLink';
import { ArrowDown1 } from '../../../svg';

import './leftHome.css';

const LeftHome = ({ user }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className='left_home scrollbar'>
      <Link to='/profile' className='left_link hover1'>
        <img src={user?.picture} alt='' />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, index) => (
        <LeftLink
          key={index}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div className='left_link hover1' onClick={() => setVisible(true)}>
          <div className='small_circle'>
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className='more_left'>
          {left.slice(8, left.length).map((link, index) => (
            <LeftLink
              key={index}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div className='left_link hover1' onClick={() => setVisible(false)}>
            <div className='small_circle rotate360'>
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftHome;
