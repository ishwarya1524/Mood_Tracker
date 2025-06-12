import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://mood-tracker-zeei.onrender.com/api/auth/register', form);
    alert('Registered!');
  };

  return (
    <div className={` h-[91.8vh] flex flex-col justify-center items-center bg-[url('https://myfiles.123freevectors.com/images/202450-pastel-blue-simple-background.jpg')] bg-cover bg-center`}>
    <form onSubmit={handleSubmit}className='bg-white flex flex-col justify-center items-center  shadow-xl rounded-lg w-100'>
    <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-900 text-2xl font-bold mb-5'>REGISTER</h1>
      <input name="name" placeholder="Name" onChange={handleChange} className='border-1 p-3 w-90 rounded-md'/><br/>
      <input name="email" placeholder="Email" onChange={handleChange} className='border-1 p-3 w-90 rounded-md'/><br/>
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className='border-1 p-3 w-90 rounded-md'/><br/>
      <button type="submit" className='bg-gradient-to-r from-blue-300 to-blue-900 p-3 w-90 rounded-full text-white font-bold shadow-md hover: cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl '>Register</button>
    </form>
    </div>
  );
}
