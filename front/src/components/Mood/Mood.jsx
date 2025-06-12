import React, { useState } from 'react'
import axios from "axios"
const Mood = () => {

    const [form,setform]=useState({date:'',mood:'',note:''});

    const handlechange=(e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        const token=localStorage.getItem('token');
        await axios.post('https://mood-tracker-zeei.onrender.com/api/moods',form,{headers:{Authorization:token}});
        alert("Mood saved");
    }

  return (
    <div className={`bg-violet-200 h-[92vh] flex flex-col justify-center items-center bg-[url('https://myfiles.123freevectors.com/images/202450-pastel-blue-simple-background.jpg')] bg-cover bg-center`}>
    <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-900 font-bold text-3xl mb-8'>Welcome to MoodTracker!</h1>
    <form onSubmit={handlesubmit} className='bg-white h-1/2 flex flex-col justify-center items-center  shadow-xl gap-6 rounded-lg w-100'>
      <input name='date' type='date' onChange={handlechange} placeholder='Enter the date' required className='border-1 shadow-sm w-90 rounded-md p-3 '/>
      <input name='mood' onChange={handlechange} placeholder='Enter the Mood' required className='border-1 p-3 w-90 rounded-md' />
      <textarea name='note' onChange={handlechange} placeholder='Enter your Thoughts..!' required className='border-1 p-3 w-90 rounded-md'/>
      <button type='submit' className='bg-gradient-to-r from-blue-300 to-blue-900 p-3 w-90 rounded-full text-white font-bold shadow-md hover: cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl '>Submit</button>
    </form>
    </div>
  )
}

export default Mood
