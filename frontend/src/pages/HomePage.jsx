import React, { use, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import toast from 'react-hot-toast';
import axios from 'axios'; 

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const rateLimitError = ()=>  toast.error("You are rate limited. Please try again later.");
  const handleRateLimit = () => {
    setIsRateLimited(true);
    rateLimitError();
  };

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await axios.get('http://localhost:3000/api/notes');
        console.log(res.data);
      } catch(error){
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  },[])

  return (
    <div className="min-h-screen">
      <NavBar/>
      <button onClick={rateLimitError} className='btn btn-ghost'>press</button>
      
    </div>
  )
}

export default HomePage