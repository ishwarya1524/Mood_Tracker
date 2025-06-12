import React, { useEffect, useState } from 'react';
import axios from "axios";

const History = () => {
  const [moods, setMoods] = useState({}); // moods is an object with date keys

  useEffect(() => {
    const fetchMoods = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/moods', {
          headers: { Authorization: token }
        });
        setMoods(res.data);
      } catch (err) {
        console.error("Failed to fetch moods", err);
      }
    };
    fetchMoods();
  }, []);

  // Convert moods object to array of [date, moodEntries]
  const moodsArray = Object.entries(moods);

  return (
    <div className={` min-h-screen flex flex-col gap-7  items-center bg-[url('https://myfiles.123freevectors.com/images/202450-pastel-blue-simple-background.jpg')] bg-cover`}>
      <h2 className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-900 text-3xl font-bold mt-10 '>History</h2>
      {moodsArray.length === 0 && <p className='bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-900 font-bold'>No moods found</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-6 w-full max-w-6xl">
  {moodsArray.map(([date, entries]) => (
    <li key={date} className="bg-blue-400 shadow-lg rounded-xl p-2 flex flex-col">
      <h3 className="text-lg font-mono text-white mb-1 gradient-text">{date}</h3>
      <ul className="space-y-4">
        {entries.map((entry, idx) => (
          <li
            key={idx}
            className="bg-blue-200 rounded-lg p-2 shadow-md w-full"
          >
          <div className='flex gap-2 bg-blue-300  items-center justify-center p-2'>
          <p className="font-bold text-blue-900">Mood ~</p>
          <p className='font-bold text-[#1a8cff]'>{entry.mood}</p>
          </div>
            <div className='flex flex-col  '>
            <p className="text-mono text-white font-bold  py-2 text-center rounded-sm bg-gradient-to-b from-blue-500 to-blue-400">Today Thoughts</p>
            <p className='bg-blue-300 p-1 font-[500] text-blue-800'>{entry.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>

    </div>
  );
};

export default History;
