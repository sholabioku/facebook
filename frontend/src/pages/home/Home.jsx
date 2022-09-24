import { useRef, useState } from 'react';
import Header from '../../components/header/Header';
import useClickOutside from '../../helpers/clickOutside';
import './home.css';

const Home = () => {
  const element = useRef(null);
  const [visible, setVisible] = useState(true);
  useClickOutside(element, () => {
    setVisible(false);
  });

  return (
    <div>
      <Header />
      {visible && <div className='card' ref={element}></div>}
    </div>
  );
};

export default Home;
