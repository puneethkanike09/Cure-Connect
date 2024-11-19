import { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
        if (data.success) {
          toast.success(data.message);  // Display toast before state update
          localStorage.setItem('aToken', data.token);
          setAToken(data.token); // Update state after toast
          console.log(data.message);
        } else {
          toast.error(data.message);
          console.log(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
        if (data.success) {
          toast.success(data.message);  // Display toast before state update
          localStorage.setItem('dToken', data.token);
          setDToken(data.token); // Update state after toast
          console.log(data.token)
          console.log(data.message);
        } else {
          toast.error(data.message);
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col gap-6 p-10 rounded-xl bg-[#f7f7f7] max-w-[400px] w-full text-[#5e5e5e]'>
        <p className='text-2xl font-semibold text-center'>
          <span className='text-primary'>{state}</span> Login
        </p>
        <div className='w-full'>
          <label className='block mb-2 text-sm'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
            type="email"
            required
          />
        </div>
        <div className='w-full'>
          <label className='block mb-2 text-sm'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
            type="password"
            required
          />
        </div>
        <button
          className='bg-primary text-white py-3 rounded-lg text-base hover:bg-opacity-90 transition-all duration-200'
          type="submit"
        >
          Login
        </button>
        {
          state === 'Admin' ? (
            <p className='text-center'>
              Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span>
            </p>
          ) : (
            <p className='text-center'>
              Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span>
            </p>
          )
        }
      </div>
    </form>
  );
};

export default Login;
