import { ErrorMessage, useField } from 'formik';
import './loginInput.css';

const LoginInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='input_wrap'>
      <div>
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </div>
      <input
        className={meta.touched && meta.error && 'input_error_border'}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </div>
  );
};

export default LoginInput;
