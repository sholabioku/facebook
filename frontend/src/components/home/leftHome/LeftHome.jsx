import { Link } from 'react-router-dom';
import { left } from '../../../data/home';
import './leftHome.css';
import LeftLink from './LeftLink';

const LeftHome = ({ user }) => {
  return (
    <div className='left_home'>
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
    </div>
  );
};

export default LeftHome;
