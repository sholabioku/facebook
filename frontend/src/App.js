import { Routes, Route } from 'react-router-dom';
import Activate from './pages/home/Activate';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Reset from './pages/reset/Reset';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path='/' element={<Home />} exact />
          <Route path='/activate/:token' element={<Activate />} exact />
          <Route path='/profile' element={<Profile />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
        <Route path='/reset' element={<Reset />} exact />
      </Routes>
    </div>
  );
};

export default App;
