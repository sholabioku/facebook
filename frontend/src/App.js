import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/login' element={<Login />} exact />
        <Route path='/profile' element={<Profile />} exact />
      </Routes>
    </div>
  );
};

export default App;
