import Footer from '../../components/login/Footer';
import LoginForm from '../../components/login/LoginForm';
import RegisterForm from '../../components/login/RegisterForm';

import './login.css';

const Login = () => {
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm />
        <RegisterForm />
        <Footer />
      </div>
    </div>
  );
};

export default Login;
